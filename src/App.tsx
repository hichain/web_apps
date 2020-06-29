import { Client } from "boardgame.io/react";
import "./App.css";
import { Slashchain } from "./slashchain/game";
import { GameComponent } from "./slashchain/view/game_state";

const App = Client({
  game: Slashchain,
  numPlayers: 2,
  board: GameComponent,
});

export default App;
