import { Client } from "boardgame.io/react";
import { TicTacToe } from "./Game";
import { TicTacToeBoard } from "./Board";
import "./App.css";

const App = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
});

export default App;
