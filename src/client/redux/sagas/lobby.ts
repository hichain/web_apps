import { history } from "@/client/history";
import { lobbyClient } from "@/client/lobby/client";
import { SupportedGame } from "@games";
import { filterSupportedGames, setGameList } from "@redux/modules/gameList";
import { clearPlayingMatch, setPlayingMatch } from "@redux/modules/match";
import {
  addMatch as addMatchToHistory,
  removeMatch,
} from "@redux/modules/matchHistory";
import { addMatch, isSupportedMatch } from "@redux/modules/matchList";
import { createAction } from "@reduxjs/toolkit";
import { routes } from "@routes";
import { select } from "@utils/reduxSaga";
import _ from "lodash";
import { all, call, put, takeLatest, takeLeading } from "typed-redux-saga";

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

function* joinMatchSaga(action: ReturnType<typeof actionCreators.joinMatch>) {
  const { gameName, matchID } = action.payload;

  const matchResponse = yield* call(() =>
    lobbyClient.getMatch(gameName, matchID)
  );
  if (!matchResponse.ok) {
    // TODO: toast error
    history.replace(routes.gameList);
    throw matchResponse.error;
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
    // TODO: toast error
    history.replace(routes.gameList);
    throw joinedMatchResponse.error;
  }

  yield* put(
    addMatchToHistory({
      gameName,
      matchID,
      playerID,
      credentials: joinedMatchResponse.body.playerCredentials,
    })
  );
}

function* getGamesSaga(_action: ReturnType<typeof actionCreators.getGames>) {
  // TODO: fix error
  const response = yield* call(() => lobbyClient.listGames());
  if (!response.ok) {
    // TODO: toast error
    throw response.error;
  }

  const supportedGameList = filterSupportedGames(response.body);
  yield* put(setGameList(supportedGameList));

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
        yield* put(addMatch(response.body));
      } else {
        yield* put(removeMatch({ matchID }));
      }
    })
  );
}

function* createMatchSaga(
  action: ReturnType<typeof actionCreators.createMatch>
) {
  const { gameName, numPlayers } = action.payload;
  yield* put(clearPlayingMatch());

  const response = yield* call(() =>
    lobbyClient.createMatch(gameName, { numPlayers })
  );
  if (!response.ok) {
    history.replace(routes.gameList);
    // TODO: toast error
    throw response.error;
  }

  yield* put(setPlayingMatch(response.body.matchID));
}

export function* lobbySagas() {
  yield* takeLeading(actions.joinMatch, joinMatchSaga);
  yield* takeLatest(actions.getGames, getGamesSaga);
  yield* takeLatest(actions.getJoinedMatches, getJoinedMatchesSaga);
  yield* takeLeading(actions.createMatch, createMatchSaga);
}

export const { joinMatch, getGames, getJoinedMatches, createMatch } =
  actionCreators;
