import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GameList = string[];

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
