import { Tail } from "@redux-saga/core/effects";
import { actionCreator, RootState } from "@redux/store";
import { AnyAction } from "redux";
import { select as selectState, put as putState, call } from "typed-redux-saga";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const select = <Fn extends (state: RootState, ...args: any[]) => any>(
  selector: Fn,
  ...args: Tail<Parameters<Fn>>
) => selectState<Fn>(selector, ...args);

export const put = (create: (creator: typeof actionCreator) => AnyAction) => {
  return putState(create(actionCreator));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const viewAction = (worker: (...args: any[]) => unknown) => {
  return function* (...args: unknown[]) {
    yield* put(({ view }) => view.startAction());
    yield* call(worker, ...args);
    yield* put(({ view }) => view.endAction());
  };
};
