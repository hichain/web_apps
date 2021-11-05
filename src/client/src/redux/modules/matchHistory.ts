import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SupportedGame } from "@games";

export type JoinedMatch = {
  matchID: string;
  gameName: SupportedGame;
  playerID: string;
  credentials: string;
};

export type MatchHistory = JoinedMatch[];

const initialState: MatchHistory = [];

export const matchHistoryModule = createSlice({
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
