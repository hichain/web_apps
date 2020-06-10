import React from "react";
import logo from "./logo.svg";
import { Client } from "boardgame.io/react";
import { TicTacToe } from "./Game";
import "./App.css";

const App = Client({ game: TicTacToe });

export default App;
