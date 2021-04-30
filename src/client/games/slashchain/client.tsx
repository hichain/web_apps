import { Client as BoardGameClient } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Slashchain } from "@games";
import { TabletopComponent } from "./tabletop";
import { lobbyServerURL } from "@/client/lobby/client";

export const Client = BoardGameClient({
  game: Slashchain,
  numPlayers: 2,
  board: TabletopComponent,
  multiplayer: SocketIO({
    server: lobbyServerURL,
  }),
});
