import { Client as BoardGameClient } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Slashchain } from "@games";
import { GameComponent } from "./game";
import { envs } from "@/envs";

export const Client = BoardGameClient({
  game: Slashchain,
  numPlayers: 2,
  board: GameComponent,
  multiplayer: SocketIO({
    server: envs?.master?.url,
  }),
});
