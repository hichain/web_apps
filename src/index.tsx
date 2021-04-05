import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { SlashchainApp } from "./client";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route
        path="/slashchain/0"
        exact
        render={(): JSX.Element => <SlashchainApp playerID={"0"} />}
      />
      <Route
        path="/slashchain/1"
        exact
        render={(): JSX.Element => <SlashchainApp playerID={"1"} />}
      />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
