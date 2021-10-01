import { all, fork } from "typed-redux-saga";
import { lobbySagas } from "./lobby";

// Redux-Saga Design Pattern: https://redux-saga.js.org/docs/advanced/RootSaga

export function* rootSaga() {
  yield* all([fork(lobbySagas)]);
}
