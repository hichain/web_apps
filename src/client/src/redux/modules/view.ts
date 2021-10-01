import { createSlice } from "@reduxjs/toolkit";

export type View = {
  action: "running" | "none";
};

const initialState: View = {
  action: "none",
};

export const viewModule = createSlice({
  name: "view",
  initialState,
  reducers: {
    startAction: (state) => {
      state.action = "running";
    },
    endAction: (state) => {
      state.action = "none";
    },
  },
});
