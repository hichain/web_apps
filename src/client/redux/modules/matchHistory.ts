import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LobbyAPI } from "boardgame.io";

export type Match = {
  matchID: string;
  gameName: string;
  playerID: string;
  credentials: string;
  detail?: LobbyAPI.Match;
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
    addMatchDetail: (state, action: PayloadAction<LobbyAPI.Match[]>) => {
      const matchList = action.payload;
      return state.map((match) => {
        const matchDetail = matchList.find(
          (detail) => match.matchID === detail.matchID
        );
        return { ...match, detail: matchDetail };
      });
    },
    removeMatch: (state, action: PayloadAction<{ matchID: string }>) => {
      return state.filter((match) => match.matchID !== action.payload.matchID);
    },
    clearAllMatches: () => {
      return [];
    },
  },
});

export const { addMatch, addMatchDetail, removeMatch, clearAllMatches } =
  matchHistoryModule.actions;
