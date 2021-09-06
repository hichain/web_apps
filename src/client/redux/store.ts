import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { gameModule } from "./modules/game";
import { playerModule } from "./modules/player";
import { rootSaga } from "./sagas";

// Redux Design Pattern: https://react-redux.js.org/tutorials/typescript-quick-start

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    player: playerModule.reducer,
    game: gameModule.reducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
