import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

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
