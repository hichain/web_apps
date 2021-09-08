import { history } from "@/client/history";
import { lobbyClient } from "@/client/lobby/client";
import { setGameList } from "@redux/modules/gameList";
import { addMatch, addMatchDetail } from "@redux/modules/matchHistory";
import { createAction } from "@reduxjs/toolkit";
import { routes } from "@routes";
import { select } from "@utils/reduxSaga";
import { all, call, put, takeLatest, takeLeading } from "typed-redux-saga";

const actions = {
  joinMatch: "lobby/joinMatch",
  getGames: "lobby/getGames",
  getPlayingMatches: "lobby/getPlayingMatches",
} as const;

const actionCreators = {
  joinMatch: createAction<{ gameName: string; matchID: string }>(
    actions.joinMatch
  ),
  getGames: createAction(actions.getGames),
  getPlayingMatches: createAction(actions.getPlayingMatches),
};

function* joinMatchSaga(action: ReturnType<typeof actionCreators.joinMatch>) {
  const { gameName, matchID } = action.payload;

  try {
    const { players } = yield* call(() =>
      lobbyClient.getMatch(gameName, matchID)
    );
    const numPlayers = players.filter((player) => player.name != null).length;
    const playerID = numPlayers.toString();
    const { playerCredentials } = yield* call(
      lobbyClient.joinMatch,
      gameName,
      matchID,
      {
        playerID,
        playerName: playerID,
      }
    );
    yield* put(
      addMatch({ matchID, gameName, playerID, credentials: playerCredentials })
    );
  } catch {
    // TODO: toast error
    history.replace(routes.gameList);
  }
}

function* getGamesSaga(_action: ReturnType<typeof actionCreators.getGames>) {
  try {
    const gameList = yield* call(() => lobbyClient.listGames());
    yield* put(setGameList(gameList));
  } catch {
    // ignore failure
  }
}

function* getPlayingMatchesSaga(
  _action: ReturnType<typeof actionCreators.getPlayingMatches>
) {
  const matchHistory = yield* select((state) => state.matchHistory);

  try {
    const matchList = yield* all(
      matchHistory.map((match) =>
        call(() => lobbyClient.getMatch(match.gameName, match.matchID))
      )
    );
    yield* put(addMatchDetail(matchList));
  } catch {
    // TODO: toast error
  }
}

export function* lobbySagas() {
  yield* takeLeading(actions.joinMatch, joinMatchSaga);
  yield* takeLatest(actions.getGames, getGamesSaga);
  yield* takeLatest(actions.getPlayingMatches, getPlayingMatchesSaga);
}

export const { joinMatch, getGames, getPlayingMatches } = actionCreators;
