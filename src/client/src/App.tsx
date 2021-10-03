import React, { FC } from "react";
import { Redirect, Router, Switch } from "react-router";
import { DebugComponent } from "./debug";
import { gameComponents } from "./games";
import { pages, routes } from "./assets/routes";
import { PageRoute } from "./page";
import { history } from "./history";
import { supportedGames } from "@games";
import { Header } from "./header";
import { ProgressBar } from "./progressbar";
import { styled } from "@mui/system";
import { Footer } from "./footer";

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
  <Router history={history}>
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
  </Router>
);

export const App: FC = () => (
  <>
    <StyledHeader />
    <ProgressBar />
    <Page />
    <Footer />
  </>
);
