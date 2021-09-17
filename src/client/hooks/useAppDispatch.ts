import { actionCreator, AppDispatch } from "@redux/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

export const useAppDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    (create: (creator: typeof actionCreator) => AnyAction) => {
      dispatch(create(actionCreator));
    },
    [dispatch]
  );
};
