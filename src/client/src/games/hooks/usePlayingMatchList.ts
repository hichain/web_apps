import { useAppDispatch } from "@redux/hooks/useAppDispatch";
import { useAppSelector } from "@redux/hooks/useAppSelector";
import { JoinedMatch } from "@redux/modules/matchHistory";
import { Match } from "@redux/modules/matchList";
import { useEffect } from "react";

export type PlayingMatchList = (JoinedMatch & Match)[];

export const usePlayingMatchList = (): PlayingMatchList => {
  const dispatch = useAppDispatch();

  const playingMatchList = useAppSelector((state, selector) =>
    selector.matchHistory.getPlayingMatchList(state)
  );

  useEffect(() => {
    dispatch(({ lobby }) => lobby.getJoinedMatches());
  }, [dispatch]);

  return playingMatchList;
};
