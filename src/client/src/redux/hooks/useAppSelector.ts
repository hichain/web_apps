import { useSelector } from "react-redux";
import { RootState, selectors } from "../store";

export const useAppSelector = <T>(
  select: (state: RootState, selector: typeof selectors) => T
) => {
  return useSelector<RootState, T>((state) => select(state, selectors));
};
