import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Match = {
  matchID: string;
  gameName: string;
  playerID: string;
  credentials: string;
};

export type MatchHistory = Match[];

const initialState: MatchHistory = [];

export const matchHistoryModule = createSlice({
  name: "matchHistory",
  initialState,
  reducers: {
    addMatch: (state, action: PayloadAction<Match>) => {
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

export const { addMatch, removeMatch, clearAllMatches } =
  matchHistoryModule.actions;
