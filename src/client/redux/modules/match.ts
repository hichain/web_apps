import { NamedPlayer } from "@/games";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlayingMatch = {
  player?: NamedPlayer;
  isMyTurn: boolean;
  matchID?: string;
};

const initialState: PlayingMatch = { isMyTurn: false };

export const matchModule = createSlice({
  name: "match",
  initialState,
  reducers: {
    startMatch: (
      state,
      action: PayloadAction<{
        player: NamedPlayer;
        isMyTurn: boolean;
      }>
    ) => {
      state.player = action.payload.player;
      state.isMyTurn = action.payload.isMyTurn;
    },
    setPlayingMatch: (state, action: PayloadAction<string>) => {
      state.matchID = action.payload;
    },
    clearPlayingMatch: (state) => {
      state.matchID = undefined;
    },
    nextTurn: (state) => {
      state.isMyTurn = !state.isMyTurn;
    },
  },
});

export const { startMatch, setPlayingMatch, clearPlayingMatch, nextTurn } =
  matchModule.actions;
