import React, { FC } from "react";
import { Redirect, Router, Switch } from "react-router";
import { DebugComponent } from "./client";
import { gameComponents, GameListComponent } from "./client/games";
import { pages, routes } from "./client/assets/routes";
import { PageRoute } from "./page";
import { history } from "./client/history";
import { supportedGames } from "@games";

const { match: GameMatch, top: GameTop } = gameComponents;

export const App: FC = () => (
  <Router history={history}>
    <Switch>
      <PageRoute
        title={pages.gameList}
        path={routes.gameList}
        exact
        component={GameListComponent}
      />
      {supportedGames.map((game) => (
        <PageRoute
          key={`${game}-top`}
          title={pages.game(game)}
          path={routes.game(game)}
          exact
          render={() => <GameTop gameName={game} />}
        />
      ))}
      {supportedGames.map((game) => (
        <PageRoute
          key={`${game}-match`}
          title={pages.game(game)}
          path={routes.match(game, ":matchID")}
          render={({ match }) => (
            <GameMatch gameName={game} matchID={match.params.matchID ?? ""} />
          )}
        />
      ))}
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
