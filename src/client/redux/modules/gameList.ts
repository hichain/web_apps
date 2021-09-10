import { gameMap } from "@games";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

export type SupportedGame = keyof typeof gameMap;
export type GameList = SupportedGame[];

const initialState: GameList = [];

export const gameListModule = createSlice({
  name: "gameList",
  initialState,
  reducers: {
    setGameList: (_state, action: PayloadAction<GameList>) => {
      return action.payload;
    },
  },
});

export const { setGameList } = gameListModule.actions;

const isSupportedGame = (game: string): game is SupportedGame =>
  _.keys(gameMap).includes(game);

export const filterSupportedGames = (games: string[]): GameList =>
  games.filter(isSupportedGame);
