import { Client } from "boardgame.io/react";
import "./App.css";
import { Slashchain } from "./slashchain/view/game";
import { GameStateComponent } from "./slashchain/view/game_state";

const App = Client({
  game: Slashchain,
  numPlayers: 2,
  board: GameStateComponent,
});

export default App;
