import { NamedPlayer } from "@/games";
import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

type State =
  | {
      inGame: false;
    }
  | {
      inGame: true;
      player: NamedPlayer;
      isMyTurn: boolean;
    };

const initialState: State = { inGame: false };

const slice = createSlice<State, SliceCaseReducers<State>>({
  name: "game",
  initialState,
  reducers: {
    start: (
      _state,
      action: PayloadAction<{ player: NamedPlayer; isMyTurn: boolean }>
    ) => {
      return { inGame: true, ...action.payload };
    },
    end: () => {
      return { inGame: false };
    },
  },
});

export type Game = State;
export const selectGame = (state: RootState) => state.game;
export const gameReducer = slice.reducer;
