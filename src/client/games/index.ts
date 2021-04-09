import { Slashchain } from "@/games/index";
import { GameComponent } from "boardgame.io/dist/types/src/lobby/connection";
import { App as SlashchainApp } from "./slashchain/app";
import { GameTopComponent as SlashchainTop } from "./slashchain";

export { SlashchainApp };

export const gameComponents: GameComponent[] = [
  {
    game: Slashchain,
    board: SlashchainApp,
  },
];

export const gameTopComponents = {
  slashchain: SlashchainTop,
};
