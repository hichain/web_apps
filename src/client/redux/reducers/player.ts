import { Cell } from "@/games";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type State = {
  pickedTile?: { index: number; angle: number };
  selectedCell?: Cell;
};

const initialState: State = {};

const slice = createSlice({
  name: "player",
  initialState,
  reducers: {
    pickTile: (
      state,
      action: PayloadAction<{ index: number; angle: number }>
    ) => {
      state.pickedTile = action.payload;
    },
    rotateTile: (state, action: PayloadAction<{ angle: number }>) => {
      state.pickedTile = state.pickedTile && {
        ...state.pickedTile,
        angle: action.payload.angle,
      };
    },
    putTile: (state, action: PayloadAction<{ cell: Cell }>) => {
      state.selectedCell = action.payload.cell;
    },
    reset: () => {
      return {};
    },
  },
});

export type Player = State;
export const selectPlayer = (state: RootState) => state.player;
export const playerReducer = slice.reducer;
