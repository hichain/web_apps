import { configureStore } from "@reduxjs/toolkit";

// Redux Design Pattern: https://react-redux.js.org/tutorials/typescript-quick-start

const store = configureStore({ reducer: {} });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
