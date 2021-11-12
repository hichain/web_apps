import { createSelector } from "@reduxjs/toolkit";
import { SupportedGame } from "@games";
import { RootState } from "./store";

const matchHistory = {
  find: createSelector(
    (state: RootState) => state.matchHistory,
    (_state: RootState, props: { gameName: SupportedGame; matchID: string }) =>
      props,
    (matchHistory, { gameName, matchID }) =>
      matchHistory.find(
        (match) => match.gameName === gameName && match.matchID === matchID
      )
  ),
  getPlayingMatchList: createSelector(
    (state: RootState) => state.matchHistory,
    (state: RootState) => state.matchList,
    (matchHistory, matchList) =>
      matchHistory
        .map((match) => [match, matchList[match.matchID]] as const)
        .filter(([, detail]) => detail != null)
        .map(([match, detail]) => ({ ...match, ...detail }))
  ),
};

export const selectors = {
  matchHistory,
} as const;
