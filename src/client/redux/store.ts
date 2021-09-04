import { configureStore } from "@reduxjs/toolkit";
import { gameModule } from "./reducers/game";
import { playerModule } from "./reducers/player";

// Redux Design Pattern: https://react-redux.js.org/tutorials/typescript-quick-start

export const store = configureStore({
  reducer: {
    player: playerModule.reducer,
    game: gameModule.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
