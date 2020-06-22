import { Client } from "boardgame.io/react";
import { TicTacToe } from "./tic-tac-toe/Game";
import { TicTacToeBoard } from "./tic-tac-toe/Board";
import { SocketIO } from "boardgame.io/multiplayer";
import "./App.css";

const serverUri = process.env.REACT_APP_DOMAIN;

const App = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: SocketIO({ server: serverUri })
});

export default App;
