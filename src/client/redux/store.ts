import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./reducers/game";
import { playerReducer } from "./reducers/player";

// Redux Design Pattern: https://react-redux.js.org/tutorials/typescript-quick-start

export const store = configureStore({
  reducer: { player: playerReducer, game: gameReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
