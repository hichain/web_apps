import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Slashchain } from "@games";
import { TabletopComponent } from "./tabletop";
import { lobbyServerURL } from "@/client/lobby/client";

export const SlashchainClient = Client({
  game: Slashchain,
  numPlayers: 2,
  board: TabletopComponent,
  multiplayer: SocketIO({
    server: lobbyServerURL,
  }),
});
