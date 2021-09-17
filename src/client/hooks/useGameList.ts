import { GameList } from "@redux/modules/gameList";
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useGameList = (): GameList => {
  const dispatch = useAppDispatch();
  const gameList = useAppSelector((state) => state.gameList);

  useEffect(() => {
    dispatch(({ lobby }) => lobby.getGames());
  }, [dispatch]);

  return gameList;
};
