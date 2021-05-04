import "@css/reboot.css";
import "@css/common.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Redirect, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { DebugComponent } from "./client";
import { gameComponents, GameListComponent } from "./client/games";
import { pages, routes } from "./client/assets/routes";
import { PageRoute } from "./page";
import { firebase } from "@libs/firebase";

if (process.env.NODE_ENV === "production") {
  firebase.analytics();
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <PageRoute
          title={pages.gameList}
          path={routes.gameList}
          exact
          component={GameListComponent}
        />
        <PageRoute
          title={pages.slashchain}
          path={routes.slashchain.index}
          exact
          component={gameComponents.slashchain.top}
        />
        <PageRoute
          title={pages.slashchain}
          path={routes.slashchain.match}
          render={({ match }) => (
            <gameComponents.slashchain.match matchID={match.params.matchID} />
          )}
        />
        <PageRoute
          title={pages.debugger}
          path={routes.debugger}
          exact
          component={DebugComponent}
        />
        <Redirect path={routes.root} to={routes.slashchain.index} />
        <Redirect to={routes.gameList} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
