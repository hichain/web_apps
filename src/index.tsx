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
        render={(): JSX.Element => <SlashchainApp playerID={"0"} />}
      ></Route>
      <Route
        path="/slashchain/1"
        render={(): JSX.Element => <SlashchainApp playerID={"1"} />}
      ></Route>
      <Route
        path="/"
        exact
        render={() => `NODE_ENV = ${process.env.NODE_ENV}`}
      />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
