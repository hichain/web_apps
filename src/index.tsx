import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { DebugComponent } from "./client";
import "@css/reboot.css";
import "@css/common.scss";
import { gameComponents, GameListComponent } from "./client/games";
import { TopComponent } from "./top";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/games/" exact component={GameListComponent} />
        <Route
          path="/games/slashchain"
          exact
          component={gameComponents.slashchain.top}
        />
        <Route
          path="/games/slashchain/:matchID"
          render={({ match }) => (
            <gameComponents.slashchain.match matchID={match.params.matchID} />
          )}
        />
        <Route path="/debug" exact component={DebugComponent} />
        <Route component={TopComponent} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
