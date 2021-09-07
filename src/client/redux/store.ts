import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { gameModule } from "./modules/game";
import { matchHistoryModule } from "./modules/matchHistory";
import { playerModule } from "./modules/player";
import { rootSaga } from "./sagas";
import { load, save } from "redux-localstorage-simple";

// Redux Design Pattern: https://react-redux.js.org/tutorials/typescript-quick-start

const sagaMiddleware = createSagaMiddleware();

const reducer = {
  player: playerModule.reducer,
  game: gameModule.reducer,
  matchHistory: matchHistoryModule.reducer,
} as const;

const localStorageConfig: {
  namespace: string;
  states: (keyof typeof reducer)[];
} = { namespace: "app", states: ["matchHistory"] };

export const store = configureStore({
  reducer,
  middleware: [sagaMiddleware, save(localStorageConfig)],
  preloadedState: load(localStorageConfig),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
