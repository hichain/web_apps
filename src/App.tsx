import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import "./App.css";
import { Slashchain } from "./slashchain/game";
import { GameComponent } from "./slashchain/view/game_state";

const serverUri = process.env.REACT_APP_DOMAIN;

const App = Client({
  game: Slashchain,
  numPlayers: 2,
  board: GameComponent,
  multiplayer: SocketIO({ server: serverUri }),
});

export default App;
