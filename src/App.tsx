import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import "./App.css";
import { Slashchain } from "./games/slashchain/game";
import { GameComponent } from "./games/slashchain/components/game_state";

const App = Client({
  game: Slashchain,
  numPlayers: 2,
  board: GameComponent,
  multiplayer: SocketIO({
    server: process.env.REACT_APP_MASTER_URL,
  }),
});

export default App;
