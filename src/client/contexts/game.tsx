import { createContext } from "react";
import { NamedPlayer } from "@/games";

export type GameContextState = {
  player: NamedPlayer;
  isMyTurn: boolean;
};

export const GameContext = createContext<GameContextState | undefined>(undefined);
