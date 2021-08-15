import React, { useReducer } from "react";

type Match = {
  matchID: string;
  gameID: string;
  playerID: string;
  credentials: string;
};

type State = Match[];

type Action =
  | {
      type: "add_match";
      payload: Match;
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
      const newState = [...state, action.payload];
      localStorage.setItem("matches", JSON.stringify(newState));
      return newState;
    }
    case "remove_match": {
      const newState = state.filter(
        (match) => match.matchID !== action.payload.matchID
      );
      localStorage.setItem("matches", JSON.stringify(newState));
      return newState;
    }
    case "clear_all_matches": {
      localStorage.removeItem("matches");
      return [];
    }
  }
};

export const useMatchHistory = (): [State, React.Dispatch<Action>] => {
  return useReducer(reducer, [], init);
};
