import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LobbyAPI } from "boardgame.io";
import { gameMap, SupportedGame } from "@games";
import _ from "lodash";

export type Match = LobbyAPI.Match & { gameName: SupportedGame };

export type MatchList = {
  [matchID: string]: Match;
};

const initialState: MatchList = {};

export const matchListModule = createSlice({
  name: "matchList",
  initialState,
  reducers: {
    addMatch: (state, action: PayloadAction<Match>) => {
      state[action.payload.matchID] = action.payload;
    },
  },
});

export const { addMatch } = matchListModule.actions;

export const isSupportedMatch = (match: LobbyAPI.Match): match is Match => {
  return _.keys(gameMap).includes(match.gameName);
};
