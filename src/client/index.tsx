import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Route } from "react-router";
import { BrowserRouter } from "r./client/games/Debugom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route
        path="/slashchain/0"
        render={(): JSX.Element => <App playerID={"0"} />}
      ></Route>
      <Route
        path="/slashchain/1"
        render={(): JSX.Element => <App playerID={"1"} />}
      ></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
