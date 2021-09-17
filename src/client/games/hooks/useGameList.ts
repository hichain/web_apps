import { GameList } from "@redux/modules/gameList";
import { useEffect } from "react";
import { useAppDispatch } from "@redux/hooks/useAppDispatch";
import { useAppSelector } from "@redux/hooks/useAppSelector";

export const useGameList = (): GameList => {
  const dispatch = useAppDispatch();
  const gameList = useAppSelector((state) => state.gameList);

  useEffect(() => {
    dispatch(({ lobby }) => lobby.getGames());
  }, [dispatch]);

  return gameList;
};
