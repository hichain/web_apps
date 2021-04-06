import { Slashchain } from "@/games/index";
import { GameComponent } from "boardgame.io/dist/types/src/lobby/connection";
import { App as SlashchainApp } from "./slashchain/app";

export { SlashchainApp };

export const gameComponents: GameComponent[] = [
  {
    game: Slashchain,
    board: SlashchainApp,
  },
];
