import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VariantType } from "notistack";

export type Notification = {
  key: string;
  message: string;
  variant: VariantType;
};

export type Notifications = (Notification & {
  dismissed: boolean;
})[];

const initialState: Notifications = [];

export const notificationsModule = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    enqueue: (state, action: PayloadAction<Notification>) => {
      state.push({ ...action.payload, dismissed: false });
    },
    close: (state, action: PayloadAction<{ key: string }>) => {
      return state.map((notification) =>
        notification.key === action.payload.key
          ? { ...notification, dismissed: true }
          : notification
      );
    },
    closeAll: (state) => {
      return state.map((notification) => ({
        ...notification,
        dismissed: true,
      }));
    },
    remove: (state, action: PayloadAction<{ key: string }>) => {
      return state.filter(
        (notification) => notification.key !== action.payload.key
      );
    },
  },
});
