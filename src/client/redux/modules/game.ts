import { NamedPlayer } from "@/games";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Game = {
  player?: NamedPlayer;
  isMyTurn: boolean;
};

const initialState: Game = { isMyTurn: false };

export const gameModule = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (
      _state,
      action: PayloadAction<{ player: NamedPlayer; isMyTurn: boolean }>
    ) => {
      return { inGame: true, ...action.payload };
    },
    nextTurn: (state) => {
      state.isMyTurn = !state.isMyTurn;
    },
  },
});

export const { startGame, nextTurn } = gameModule.actions;
