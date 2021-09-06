import { history } from "@/client/history";
import { lobbyClient } from "@/client/lobby/client";
import { addMatch } from "@redux/modules/matchHistory";
import { createAction } from "@reduxjs/toolkit";
import { routes } from "@routes";
import { call, put, takeLeading } from "typed-redux-saga/dist";

const actions = {
  joinMatch: "lobby/joinMatch",
} as const;

const actionCreators = {
  joinMatch: createAction<{ gameName: string; matchID: string }>(
    actions.joinMatch
  ),
};

function* joinMatchSaga(action: ReturnType<typeof actionCreators.joinMatch>) {
  const { gameName, matchID } = action.payload;

  try {
    const { players } = yield* call(lobbyClient.getMatch, gameName, matchID);
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

export function* lobbySagas() {
  yield* takeLeading(actions.joinMatch, joinMatchSaga);
}

export const { joinMatch } = actionCreators;
