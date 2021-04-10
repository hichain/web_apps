import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { DebugComponent } from "./client";
import "@css/reboot.css";
import "@css/common.scss";
import { gameComponents } from "./client/games";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route
        path="/games/slashchain"
        exact
        component={gameComponents.slashchain.top}
      />
      <Route
        path="/games/slashchain/:matchID"
        exact
        render={({ match }) => (
          <gameComponents.slashchain.match matchID={match.params.matchID} />
        )}
      />
      <Route path="/debug" exact component={DebugComponent} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
