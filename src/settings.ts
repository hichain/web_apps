import { Slashchain } from "@slashchain/game";
import dotenv from "dotenv";
import { Game } from "boardgame.io";

dotenv.config();
const url = process.env.REACT_APP_URL;
const masterPort = process.env.PORT || process.env.REACT_APP_MASTER_PORT;
const lobbyPort = process.env.REACT_APP_LOBBY_PORT;

export const settings: {
  games: Game[];
  gameMaster?: {
    url: string;
    port: number;
  };
  lobby?: {
    url: string;
    port: number;
  };
} = {
  games: [Slashchain],
  gameMaster:
    (url &&
      masterPort && {
        url: `${url}:${masterPort}`,
        port: parseInt(masterPort),
      }) ||
    undefined,
  lobby:
    (url &&
      lobbyPort && {
        url: `${url}:${lobbyPort}`,
        port: parseInt(lobbyPort),
      }) ||
    undefined,
};
