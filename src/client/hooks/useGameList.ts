import { GameList } from "@redux/modules/gameList";
import { getGames } from "@redux/sagas/lobby";
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export const useGameList = (): GameList => {
  const dispatch = useAppDispatch();
  const gameList = useAppSelector((state) => state.gameList);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  return gameList;
};
