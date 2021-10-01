import { history } from "@//history";
import { lobbyClient } from "@/lobby/client";
import { SupportedGame } from "@games";
import { filterSupportedGames } from "@redux/modules/gameList";
import { isSupportedMatch } from "@redux/modules/matchList";
import { createAction } from "@reduxjs/toolkit";
import { routes } from "@routes";
import { select, put, viewAction } from "@redux/utils/saga";
import _ from "lodash";
import { all, call, takeLatest, takeLeading } from "typed-redux-saga";
import { strings } from "@strings";
import { Notification } from "@redux/modules/notifications";

const actions = {
  joinMatch: "lobby/joinMatch",
  getGames: "lobby/getGames",
  getJoinedMatches: "lobby/getJoinedMatches",
  createMatch: "lobby/createMatch",
} as const;

const actionCreators = {
  joinMatch: createAction<{ gameName: SupportedGame; matchID: string }>(
    actions.joinMatch
  ),
  getGames: createAction(actions.getGames),
  getJoinedMatches: createAction(actions.getJoinedMatches),
  createMatch: createAction<{ gameName: string; numPlayers: number }>(
    actions.createMatch
  ),
};

const getErrorNotification = (
  key: keyof typeof strings.errors
): Notification => {
  return { key, message: strings.errors[key], variant: "error" };
};

function* joinMatchSaga(action: ReturnType<typeof actionCreators.joinMatch>) {
  const { gameName, matchID } = action.payload;

  const matchResponse = yield* call(() =>
    lobbyClient.getMatch(gameName, matchID)
  );
  if (!matchResponse.ok) {
    yield* put(({ notifications }) =>
      notifications.enqueue(getErrorNotification("joinMatch"))
    );
    history.replace(routes.root);
    return;
  }

  const numPlayers = matchResponse.body.players.filter(
    (player) => player.name != null
  ).length;
  const playerID = numPlayers.toString();
  const joinedMatchResponse = yield* call(() =>
    lobbyClient.joinMatch(gameName, matchID, {
      playerID,
      playerName: playerID,
    })
  );
  if (!joinedMatchResponse.ok) {
    yield* put(({ notifications }) =>
      notifications.enqueue(getErrorNotification("joinMatch"))
    );
    history.replace(routes.root);
    return;
  }

  yield* put(({ matchHistory }) =>
    matchHistory.addMatch({
      gameName,
      matchID,
      playerID,
      credentials: joinedMatchResponse.body.playerCredentials,
    })
  );
}

function* getGamesSaga(_action: ReturnType<typeof actionCreators.getGames>) {
  const response = yield* call(() => lobbyClient.listGames());
  if (!response.ok) {
    yield* put(({ notifications }) =>
      notifications.enqueue(getErrorNotification("getGames"))
    );
    return;
  }

  const supportedGameList = filterSupportedGames(response.body);
  yield* put(({ gameList }) => gameList.setGameList(supportedGameList));

  const noSupportedGameList = _.difference(response.body, supportedGameList);
  if (noSupportedGameList.length > 0) {
    throw new Error(`No Supported Games: ${noSupportedGameList.toString()}`);
  }
}

function* getJoinedMatchesSaga(
  _action: ReturnType<typeof actionCreators.getJoinedMatches>
) {
  const matchHistory = yield* select((state) => state.matchHistory);

  yield* all(
    matchHistory.map(function* ({ gameName, matchID }) {
      const response = yield* call(() =>
        lobbyClient.getMatch(gameName, matchID)
      );
      if (response.ok && isSupportedMatch(response.body)) {
        const match = response.body;
        yield* put(({ matchList }) => matchList.addMatch(match));
      } else {
        yield* put(({ matchHistory }) => matchHistory.removeMatch({ matchID }));
      }
    })
  );
}

function* createMatchSaga(
  action: ReturnType<typeof actionCreators.createMatch>
) {
  const { gameName, numPlayers } = action.payload;
  yield* put(({ match }) => match.clearPlayingMatch());

  const response = yield* call(() =>
    lobbyClient.createMatch(gameName, { numPlayers })
  );
  if (!response.ok) {
    yield* put(({ notifications }) =>
      notifications.enqueue(getErrorNotification("createMatch"))
    );
    history.replace(routes.root);
    return;
  }

  yield* put(({ match }) => match.setPlayingMatch(response.body.matchID));
}

export function* lobbySagas() {
  yield* takeLeading(actions.joinMatch, viewAction(joinMatchSaga));
  yield* takeLatest(actions.getGames, viewAction(getGamesSaga));
  yield* takeLatest(actions.getJoinedMatches, viewAction(getJoinedMatchesSaga));
  yield* takeLeading(actions.createMatch, viewAction(createMatchSaga));
}

export const lobbyModule = {
  actions: actionCreators,
};
