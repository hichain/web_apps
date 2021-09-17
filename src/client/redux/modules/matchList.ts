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
    addMatchList: (state, action: PayloadAction<Match[]>) => {
      action.payload.forEach((match) => {
        state[match.matchID] = match;
      });
    },
  },
});

export const { addMatchList: addMatch } = matchListModule.actions;

export const isSupportedMatch = (match: LobbyAPI.Match): match is Match => {
  return _.keys(gameMap).includes(match.gameName);
};
