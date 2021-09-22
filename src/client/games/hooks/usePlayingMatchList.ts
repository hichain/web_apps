import { useAppDispatch } from "@redux/hooks/useAppDispatch";
import { useAppSelector } from "@redux/hooks/useAppSelector";
import { JoinedMatch } from "@redux/modules/matchHistory";
import { Match } from "@redux/modules/matchList";
import { useEffect, useMemo } from "react";

export type PlayingMatchList = (JoinedMatch & Match)[];

export const usePlayingMatchList = (): PlayingMatchList => {
  const dispatch = useAppDispatch();
  const matchHistory = useAppSelector((state) => state.matchHistory);
  const matchList = useAppSelector((state) => state.matchList);

  const playingMatchList = useMemo(
    () =>
      matchHistory
        .map((match) => [match, matchList[match.matchID]] as const)
        .filter(([, detail]) => detail != null)
        .map(([match, detail]) => ({ ...match, ...detail })),
    [matchHistory, matchList]
  );

  useEffect(() => {
    dispatch(({ lobby }) => lobby.getJoinedMatches());
  }, [dispatch]);

  return playingMatchList;
};
