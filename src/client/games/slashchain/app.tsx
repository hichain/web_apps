import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Slashchain, settings } from "@games";
import { GameComponent } from "./game";

export const App = Client({
  game: Slashchain,
  numPlayers: 2,
  board: GameComponent,
  multiplayer: SocketIO({
    server: settings.envs?.apiUrl,
  }),
});
