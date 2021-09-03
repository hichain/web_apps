import "@css/reboot.css";
import "@css/common.scss";
import React, { FC } from "react";
import { Redirect, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { DebugComponent } from "./client";
import { gameComponents, GameListComponent } from "./client/games";
import { pages, routes } from "./client/assets/routes";
import { PageRoute } from "./page";

const MatchComponent = gameComponents.slashchain.match;

export const App: FC = () => (
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
          <MatchComponent matchID={match.params.matchID} />
        )}
      />
      <PageRoute
        title={pages.debugger}
        path={routes.debugger}
        exact
        component={DebugComponent}
      />
      <Redirect to={routes.gameList} />
    </Switch>
  </BrowserRouter>
);
