import { SupportedGame } from "@games";
import { useMemo } from "react";
import { useAppSelector } from "@redux/hooks/useAppSelector";

export const useMatchHistory = (gameName: SupportedGame, matchID: string) => {
  const matchHistory = useAppSelector((state) => state.matchHistory);
  return useMemo(
    () =>
      matchHistory.find(
        (match) => match.gameName === gameName && match.matchID === matchID
      ),
    [gameName, matchHistory, matchID]
  );
};
