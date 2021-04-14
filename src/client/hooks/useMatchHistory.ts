import React, { useReducer } from "react";

export type Player = {
  id: string;
  credentials: string;
};

type State = {
  [matchID: string]: Player;
};

type Action =
  | {
      type: "add_match";
      payload: {
        matchID: string;
        player: Player;
      };
    }
  | {
      type: "remove_match";
      payload: {
        matchID: string;
      };
    }
  | {
      type: "clear_all_matches";
    };

const init = (initialState: State): State => {
  const rawMatches = localStorage.getItem("matches");
  if (!rawMatches) {
    return initialState;
  }
  return JSON.parse(rawMatches) as State;
};

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "add_match": {
      const newState = {
        ...state,
        [action.payload.matchID]: action.payload.player,
      };
      localStorage.setItem("matches", JSON.stringify(newState));
      return newState;
    }
    case "remove_match": {
      const { [action.payload.matchID]: _, ...newState } = state;
      localStorage.setItem("matches", JSON.stringify(newState));
      return newState;
    }
    case "clear_all_matches": {
      localStorage.removeItem("matches");
      return {};
    }
  }
};

export const useMatchHistory = (): [State, React.Dispatch<Action>] => {
  return useReducer(reducer, {}, init);
};
