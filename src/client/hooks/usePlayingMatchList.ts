import { SupportedGame } from "@games";
import { MatchDetail } from "@redux/modules/matchHistory";
import { getPlayingMatches } from "@redux/sagas/lobby";
import { groupBy } from "@utils/array";
import _ from "lodash";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const usePlayingMatchList = (): Map<SupportedGame, MatchDetail[]> => {
  const dispatch = useAppDispatch();
  const matchHistory = useAppSelector((state) => state.matchHistory);

  const playingMatchList = useMemo(() => {
    const matchDetails = _.compact(matchHistory.map((match) => match.detail));
    return groupBy(matchDetails, "gameName");
  }, [matchHistory]);

  useEffect(() => {
    dispatch(getPlayingMatches());
  }, [dispatch]);

  return playingMatchList;
};
