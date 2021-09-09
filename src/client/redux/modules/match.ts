import { NamedPlayer } from "@/games";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Match = {
  player?: NamedPlayer;
  isMyTurn: boolean;
};

const initialState: Match = { isMyTurn: false };

export const matchModule = createSlice({
  name: "match",
  initialState,
  reducers: {
    startMatch: (
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

export const { startMatch, nextTurn } = matchModule.actions;
