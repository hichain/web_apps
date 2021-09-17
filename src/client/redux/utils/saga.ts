import { Tail } from "@redux-saga/core/effects";
import { actionCreator, RootState } from "@redux/store";
import { AnyAction } from "redux";
import { select as selectState, put as putState } from "typed-redux-saga";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const select = <Fn extends (state: RootState, ...args: any[]) => any>(
  selector: Fn,
  ...args: Tail<Parameters<Fn>>
) => selectState<Fn>(selector, ...args);

export const put = (create: (creator: typeof actionCreator) => AnyAction) => {
  return putState(create(actionCreator));
};
