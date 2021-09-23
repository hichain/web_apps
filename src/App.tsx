import React, { FC } from "react";
import { Redirect, Router, Switch } from "react-router";
import { DebugComponent } from "./client";
import { gameComponents } from "./client/games";
import { pages, routes } from "./client/assets/routes";
import { PageRoute } from "./page";
import { history } from "./client/history";
import { supportedGames } from "@games";
import { Header } from "./client/header";
import { ProgressBar } from "./client/progressbar";
import { styled } from "@mui/system";

const { match: GameMatch, top: GameTop, list: GameList } = gameComponents;

const StyledGameMatch = styled(GameMatch)(() => ({
  height: "calc(100vh - 64px)",
  "& > *": {
    height: "inherit",
  },
}));

const StyledHeader = styled(Header)(() => ({
  height: 64,
}));

const Page: FC = () => (
  <Switch>
    <PageRoute path={routes.root} exact component={GameList} />
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
          <StyledGameMatch
            gameName={game}
            matchID={match.params.matchID ?? ""}
          />
        )}
      />
    ))}
    <PageRoute
      title={pages.debugger}
      path={routes.debugger}
      exact
      component={DebugComponent}
    />
    <Redirect to={routes.root} />
  </Switch>
);

export const App: FC = () => (
  <Router history={history}>
    <StyledHeader />
    <ProgressBar />
    <Page />
  </Router>
);
