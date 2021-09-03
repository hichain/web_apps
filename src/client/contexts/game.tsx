import { createContext } from "react";
import { NamedPlayer } from "@/games";

export type GameContextState = {
  player: NamedPlayer;
  isMyTurn: boolean;
};

// TODO: migrate it to redux
export const GameContext = createContext<GameContextState | undefined>(
  undefined
);
