import { Slashchain } from "./games/src/slashchain/game";
import { Game } from "boardgame.io";
import { envs } from "./envs";

export const settings: {
  games: Game[];
  gameMaster?: {
    url: string;
    port: number;
  };
} = {
  games: [Slashchain],
  gameMaster: envs && {
    url: `${envs.appUrl}:${envs.ports.master}`,
    port: envs.ports.master,
  },
};
