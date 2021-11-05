import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SupportedGame } from "@games";

export type JoinedMatch = {
  matchID: string;
  gameName: SupportedGame;
  playerID: string;
  credentials: string;
};

export type MatchHistory = JoinedMatch[];

const initialState: MatchHistory = [];

const slice = createSlice({
  name: "matchHistory",
  initialState,
  reducers: {
    addMatch: (state, action: PayloadAction<JoinedMatch>) => {
      state.push(action.payload);
    },
    removeMatch: (state, action: PayloadAction<{ matchID: string }>) => {
      return state.filter((match) => match.matchID !== action.payload.matchID);
    },
    clearAllMatches: () => {
      return [];
    },
  },
});

const selectors = {
  find: createSelector(
    (state: MatchHistory) => state,
    (
      _state: MatchHistory,
      props: { gameName: SupportedGame; matchID: string }
    ) => props,
    (matchHistory, { gameName, matchID }) =>
      matchHistory.find(
        (match) => match.gameName === gameName && match.matchID === matchID
      )
  ),
};

export const matchHistoryModule = { ...slice, selectors };
