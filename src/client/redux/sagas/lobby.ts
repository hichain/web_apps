import { history } from "@/client/history";
import { lobbyClient } from "@/client/lobby/client";
import { SupportedGame } from "@games";
import { filterSupportedGames, setGameList } from "@redux/modules/gameList";
import { clearPlayingMatch, setPlayingMatch } from "@redux/modules/match";
import { addMatch, addMatchDetail } from "@redux/modules/matchHistory";
import { createAction } from "@reduxjs/toolkit";
import { routes } from "@routes";
import { select } from "@utils/reduxSaga";
import _ from "lodash";
import { all, call, put, takeLatest, takeLeading } from "typed-redux-saga";

const actions = {
  joinMatch: "lobby/joinMatch",
  getGames: "lobby/getGames",
  getPlayingMatches: "lobby/getPlayingMatches",
  createMatch: "lobby/createMatch",
} as const;

const actionCreators = {
  joinMatch: createAction<{ gameName: SupportedGame; matchID: string }>(
    actions.joinMatch
  ),
  getGames: createAction(actions.getGames),
  getPlayingMatches: createAction(actions.getPlayingMatches),
  createMatch: createAction<{ gameName: string; numPlayers: number }>(
    actions.createMatch
  ),
};

function* joinMatchSaga(action: ReturnType<typeof actionCreators.joinMatch>) {
  const { gameName, matchID } = action.payload;

  try {
    const { players } = yield* call(() =>
      lobbyClient.getMatch(gameName, matchID)
    );
    const numPlayers = players.filter((player) => player.name != null).length;
    const playerID = numPlayers.toString();
    const { playerCredentials } = yield* call(() =>
      lobbyClient.joinMatch(gameName, matchID, {
        playerID,
        playerName: playerID,
      })
    );
    yield* put(
      addMatch({
        gameName,
        matchID,
        playerID,
        credentials: playerCredentials,
      })
    );
  } catch (e) {
    // TODO: toast error
    history.replace(routes.gameList);
    throw e;
  }
}

function* getGamesSaga(_action: ReturnType<typeof actionCreators.getGames>) {
  const gameList = yield* call(() => lobbyClient.listGames());
  const supportedGameList = filterSupportedGames(gameList);
  yield* put(setGameList(supportedGameList));

  const noSupportedGameList = _.difference(gameList, supportedGameList);
  if (noSupportedGameList.length > 0) {
    throw new Error(`No Supported Games: ${noSupportedGameList.toString()}`);
  }
}

function* getPlayingMatchesSaga(
  _action: ReturnType<typeof actionCreators.getPlayingMatches>
) {
  const matchHistory = yield* select((state) => state.matchHistory);

  const matchList = yield* all(
    matchHistory.map(({ gameName, matchID }) =>
      call(() => lobbyClient.getMatch(gameName, matchID))
    )
  );
  yield* put(addMatchDetail(matchList));

  // TODO: toast error
}

function* createMatchSaga(
  action: ReturnType<typeof actionCreators.createMatch>
) {
  const { gameName, numPlayers } = action.payload;

  yield* put(clearPlayingMatch());
  try {
    const { matchID } = yield* call(() =>
      lobbyClient.createMatch(gameName, { numPlayers })
    );
    yield* put(setPlayingMatch(matchID));
  } catch (e) {
    history.replace(routes.gameList);
    throw e;
  }
}

export function* lobbySagas() {
  yield* takeLeading(actions.joinMatch, joinMatchSaga);
  yield* takeLatest(actions.getGames, getGamesSaga);
  yield* takeLatest(actions.getPlayingMatches, getPlayingMatchesSaga);
  yield* takeLeading(actions.createMatch, createMatchSaga);
}

export const { joinMatch, getGames, getPlayingMatches, createMatch } =
  actionCreators;
