import { Client as BoardGameClient } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Slashchain } from "@games";
import { TabletopComponent } from "./tabletop";
import { envs } from "@/envs";

export const Client = BoardGameClient({
  game: Slashchain,
  numPlayers: 2,
  board: TabletopComponent,
  multiplayer: SocketIO({
    server: envs?.master.url,
  }),
});
