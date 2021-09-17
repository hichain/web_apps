import { SupportedGame } from "@games";
import { JoinedMatch } from "@redux/modules/matchHistory";
import { Match } from "@redux/modules/matchList";
import { getJoinedMatches } from "@redux/sagas/lobby";
import { groupBy } from "@utils/array";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export type PlayingMatchList = Map<SupportedGame, (JoinedMatch & Match)[]>;

export const usePlayingMatchList = (): PlayingMatchList => {
  const dispatch = useAppDispatch();
  const matchHistory = useAppSelector((state) => state.matchHistory);
  const matchList = useAppSelector((state) => state.matchList);

  const playingMatchList = useMemo(
    () =>
      groupBy(
        matchHistory
          .map((match) => [match, matchList[match.matchID]] as const)
          .filter(([, detail]) => detail != null)
          .map(([match, detail]) => ({ ...match, ...detail })),
        "gameName"
      ),
    [matchHistory, matchList]
  );

  useEffect(() => {
    dispatch(getJoinedMatches());
  }, [dispatch]);

  return playingMatchList;
};
