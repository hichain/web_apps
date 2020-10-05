import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import "./App.css";
import { Slashchain } from "./slashchain/game";
import { GameComponent } from "./slashchain/view/game_state";

const port = process.env.PORT || process.env.REACT_APP_MASTER_DEFAULT_PORT;
const App = Client({
  game: Slashchain,
  numPlayers: 2,
  board: GameComponent,
  multiplayer: SocketIO({
    server: `${process.env.REACT_APP_MASTER_URL}:${port}`,
  }),
});

export default App;
