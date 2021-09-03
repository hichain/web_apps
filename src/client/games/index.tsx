import { lobbyClient } from "@/client/lobby/client";
import { Slashchain } from "@/games";
import { strings } from "@strings";
import { LobbyAPI } from "boardgame.io";
import dayjs from "dayjs";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useMatchHistory } from "../hooks/useMatchHistory";
import { GameTopComponent as SlashchainTop } from "./slashchain";
import { Client as SlashchainClient } from "./slashchain/client";
import { GameMatchComponent as SlashchainMatch } from "./slashchain/match";

type Game = {
  id: string;
  name: string;
  playingMatches: LobbyAPI.Match[];
};

type Status = "loading" | "success" | "failure";

type ContainerProps = {
  children?: never;
  className?: string;
};

type PresenterProps = {
  status: Status;
  games: Game[];
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, status, games }) => {
  const children = useMemo(() => {
    switch (status) {
      case "loading":
        return strings.responseMessages.games.loading;
      case "success":
        return games.map((game, i) => (
          <div className="game_info" key={i}>
            <h2>{game.name}</h2>
            <h3>Playing Match List</h3>
            <ul className="playing_match_list">
              {game.playingMatches.length === 0 ? (
                <li>No Matches Found.</li>
              ) : (
                game.playingMatches.map((match) => (
                  <li key={match.matchID}>
                    <Link to={`/games/${game.id}/${match.matchID}`}>
                      {dayjs(match.createdAt).format("YYYY/MM/DD HH:mm")}
                      {match.gameover && " (Gameover!)"}
                    </Link>
                  </li>
                ))
              )}
            </ul>
            <button className="create_match_button">
              <Link to={`/games/${game.id}`}>Create a match</Link>
            </button>
          </div>
        ));
      case "failure":
        return strings.responseMessages.games.failure;
    }
  }, [games, status]);

  return (
    <div className={className}>
      <h1>Games</h1>
      <div className="games">{children}</div>
    </div>
  );
};

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
  .games {
    margin-left: 8rem;

    .playing_match_list {
      a:link,
      a:visited,
      a:hover,
      a:active {
        text-decoration: underline;
      }
    }
  }
`;

export const GameListComponent: FC<ContainerProps> = (props) => {
  const history = useHistory();

  // TODO: migrate them to redux
  const [status, setStatus] = useState<Status>("loading");
  const [gameInfo, setGameInfo] = useState<Game[]>([]);
  const [matchHistory] = useMatchHistory();

  const getPlayingMatches = useCallback(
    (gameID: string) => {
      return matchHistory.filter((match) => match.gameID === gameID);
    },
    [matchHistory]
  );

  const getGames = useCallback(() => {
    return lobbyClient.listGames();
  }, []);

  const getMatches = useCallback((gameID: string) => {
    return lobbyClient.listMatches(gameID);
  }, []);

  // TODO: migrate it to redux-saga
  const getGameInfo = useCallback(async () => {
    const gameList = await getGames();
    return Promise.all(
      gameList.map(async (gameID) => {
        const allMatches = await getMatches(gameID);
        const playingMatchIDs = getPlayingMatches(gameID).map(
          (match) => match.matchID
        );
        return {
          id: gameID,
          name: strings.games[gameID] ?? "Unknown Game",
          playingMatches: allMatches.matches.filter((match) =>
            playingMatchIDs.includes(match.matchID)
          ),
        };
      })
    );
  }, [getGames, getMatches, getPlayingMatches]);

  useEffect(() => {
    getGameInfo()
      .then((gameInfo) => {
        setGameInfo(gameInfo);
        setStatus("success");
      })
      .catch((reason) => {
        setStatus("failure");
        throw reason;
      });
  }, [getGameInfo, getGames, history]);

  return <StyledComponent {...props} status={status} games={gameInfo} />;
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
