import "@css/reboot.css";
import "@css/common.scss";
import React, { FC } from "react";
import { Redirect, Router, Switch } from "react-router";
import { DebugComponent } from "./client";
import { gameComponents, GameListComponent } from "./client/games";
import { pages, routes } from "./client/assets/routes";
import { PageRoute } from "./page";
import { history } from "./client/history";

const { match: SlashchainMatch, top: SlashchainTop } =
  gameComponents.slashchain;

export const App: FC = () => (
  <Router history={history}>
    <Switch>
      <PageRoute
        title={pages.gameList}
        path={routes.gameList}
        exact
        component={GameListComponent}
      />
      <PageRoute
        title={pages.slashchain}
        path={routes.games.slashchain.index}
        exact
        component={SlashchainTop}
      />
      <PageRoute
        title={pages.slashchain}
        path={routes.games.slashchain.match(":matchID")}
        render={({ match }) => (
          <SlashchainMatch matchID={match.params.matchID ?? ""} />
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
  </Router>
);
