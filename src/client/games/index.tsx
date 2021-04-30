import React, { FC, useCallback, useEffect, useState } from "react";
import { Slashchain } from "@/games/index";
import { Client as SlashchainClient } from "./slashchain/client";
import { GameTopComponent as SlashchainTop } from "./slashchain";
import { GameMatchComponent as SlashchainMatch } from "./slashchain/match";
import { lobbyClient } from "@/client/lobby/client";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { LobbyAPI } from "boardgame.io";
import { strings } from "@strings";

type ContainerProps = {
  children?: never;
  className?: string;
};

type PresenterProps = {
  games: string[];
  matches: { [game: string]: LobbyAPI.Match[] };
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, games, matches }) => (
  <div className={className}>
    <h1>Games</h1>

    {games.length === 0 ? (
      <div className="game_info">Loading Games...</div>
    ) : (
      games.map((game, i) => (
        <div className="game_info" key={i}>
          <h2>{strings.games[game]}</h2>
          <ul>
            <li>All Macthes: {matches[game]?.length ?? "?"}</li>
          </ul>
          <button className="create_match_button">
            <Link to={`/games/${game}`}>Create a match</Link>
          </button>
        </div>
      ))
    )}
  </div>
);

const StyledComponent = styled(DomComponent)`
  h1 {
    margin-top: 3.8rem;
    margin-bottom: 3.8rem;
    margin-left: 6rem;
  }
  h2 {
    margin-top: 2.4rem;
    margin-bottom: 2.4rem;
  }
  .game_info {
    margin-left: 8rem;
  }
  .create_match_button {
    margin-left: 2rem;
  }
`;

export const GameListComponent: FC<ContainerProps> = (props) => {
  const history = useHistory();
  const [games, setGames] = useState<string[]>([]);
  const [allMatches, setMatches] = useState<{
    [game: string]: LobbyAPI.Match[];
  }>({});

  const getGames = useCallback(() => {
    return lobbyClient.listGames();
  }, []);

  const getMatches = useCallback(async (games: string[]) => {
    return Promise.all(
      games.map((game) => {
        return new Promise<[string, LobbyAPI.Match[]]>(
          (fulfilled, rejected) => {
            lobbyClient
              .listMatches(game, { isGameover: false })
              .then(({ matches }) => {
                fulfilled([game, matches]);
              })
              .catch((reason) => rejected(reason));
          }
        );
      })
    );
  }, []);

  useEffect(() => {
    getGames()
      .then((games) => {
        setGames(games);
        getMatches(games).then((matches) => {
          setMatches(Object.fromEntries(matches));
        });
      })
      .catch(() => history.replace("/"));
  }, [getGames, getMatches, history]);

  return <StyledComponent {...props} games={games} matches={allMatches} />;
};

export { SlashchainClient };

export const gameComponents = {
  slashchain: {
    game: Slashchain,
    board: SlashchainClient,
    top: SlashchainTop,
    match: SlashchainMatch,
  },
};
