import { Cell } from "@/games";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Player = {
  pickedTile?: { index: number; angle: number };
  selectedCell?: Cell;
};

const initialState: Player = {};

export const playerModule = createSlice({
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

export const { pickTile, rotateTile, putTile, reset } = playerModule.actions;
