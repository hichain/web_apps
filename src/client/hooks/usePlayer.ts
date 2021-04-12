import React, { useReducer } from "react";

export type Player = {
  id: string;
  credentials: string;
};

type State = Player | undefined;

type ActionType = State;

const init = (initialState: State): State => {
  const id = localStorage.getItem("playerID");
  const credentials = localStorage.getItem("credentials");
  if (id && credentials) {
    return { id, credentials };
  } else {
    return initialState;
  }
};

const reducer: React.Reducer<State, ActionType> = (_, player) => {
  if (player) {
    localStorage.setItem("playerID", player.id);
    localStorage.setItem("credentials", player.credentials);
  } else {
    localStorage.removeItem("playerID");
    localStorage.removeItem("credentials");
  }
  return player;
};

export const usePlayer = (): [State, React.Dispatch<ActionType>] => {
  return useReducer(reducer, undefined, init);
};
