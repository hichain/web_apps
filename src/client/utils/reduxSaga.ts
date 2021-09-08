import { Tail } from "@redux-saga/core/effects";
import { RootState } from "@redux/store";
import { select as selectState } from "typed-redux-saga";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const select = <Fn extends (state: RootState, ...args: any[]) => any>(
  selector: Fn,
  ...args: Tail<Parameters<Fn>>
) => selectState<Fn>(selector, ...args);
