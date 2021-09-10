import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LobbyAPI } from "boardgame.io";
import { SupportedGame } from "@games";

export type Match = {
  matchID: string;
  gameName: SupportedGame;
  playerID: string;
  credentials: string;
  detail?: LobbyAPI.Match & { gameName: SupportedGame };
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
      matchList.forEach((detail) => {
        const match = state.find((match) => match.matchID === detail.matchID);
        if (match != null) {
          match.detail = { ...detail, gameName: match.gameName };
        }
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
