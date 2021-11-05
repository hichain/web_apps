import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { matchModule } from "./modules/match";
import { matchHistoryModule } from "./modules/matchHistory";
import { playerModule } from "./modules/player";
import { rootSaga } from "./sagas";
import { load, save } from "redux-localstorage-simple";
import { gameListModule } from "./modules/gameList";
import { matchListModule } from "./modules/matchList";
import { lobbyModule } from "./sagas/lobby";
import { notificationsModule } from "./modules/notifications";
import { viewModule } from "./modules/view";

// Redux Design Pattern: https://react-redux.js.org/tutorials/typescript-quick-start

const sagaMiddleware = createSagaMiddleware();

const reducer = {
  player: playerModule.reducer,
  match: matchModule.reducer,
  matchHistory: matchHistoryModule.reducer,
  gameList: gameListModule.reducer,
  matchList: matchListModule.reducer,
  notifications: notificationsModule.reducer,
  view: viewModule.reducer,
} as const;

export const actionCreator = {
  player: playerModule.actions,
  match: matchModule.actions,
  matchHistory: matchHistoryModule.actions,
  gameList: gameListModule.actions,
  matchList: matchListModule.actions,
  lobby: lobbyModule.actions,
  notifications: notificationsModule.actions,
  view: viewModule.actions,
} as const;

export const selectors = {
  matchHistory: matchHistoryModule.selectors,
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
