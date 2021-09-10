import { Slashchain, SupportedGame } from "@/games";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { getGames, getPlayingMatches } from "@redux/sagas/lobby";
import { routes } from "@routes";
import { strings } from "@strings";
import { LobbyAPI } from "boardgame.io";
import dayjs from "dayjs";
import _ from "lodash";
import React, { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTopComponent } from "./game";
import { SlashchainClient } from "./slashchain";
import { GameMatchComponent } from "./game/match";

type Status = "loading" | "success" | "failure";

type ContainerProps = {
  children?: never;
  className?: string;
};

type PresenterProps = {
  status: Status;
  games: SupportedGame[];
  playingMatches: Map<SupportedGame, LobbyAPI.Match[]>;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  status,
  games,
  playingMatches,
}) => {
  const children = useMemo(() => {
    switch (status) {
      case "loading":
        return strings.responseMessages.games.loading;
      case "success":
        return games
          .map((game) => [game, playingMatches.get(game)] as const)
          .map(([game, playingMatches], i) => (
            <div className="game_info" key={i}>
              <h2>{strings.games[game] ?? "Unknown Game"}</h2>
              <h3>Playing Match List</h3>
              <ul className="playing_match_list">
                {!playingMatches?.length ? (
                  <li>No Matches Found.</li>
                ) : (
                  playingMatches?.map((match) => (
                    <li key={match.matchID}>
                      <Link to={routes.match(game, match.matchID)}>
                        {dayjs(match.createdAt).format("YYYY/MM/DD HH:mm")}
                        {match.gameover && " (Gameover!)"}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
              <Link to={routes.game(game)}>Create a match</Link>
            </div>
          ));
      case "failure":
        return strings.responseMessages.games.failure;
    }
  }, [games, playingMatches, status]);

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

    a:link,
    a:visited,
    a:hover,
    a:active {
      text-decoration: underline;
    }
  }
`;

export const GameListComponent: FC<ContainerProps> = (props) => {
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<Status>("loading"); // TODO: migrate it to redux
  const matchHistory = useAppSelector((state) => state.matchHistory);
  const gameList = useAppSelector((state) => state.gameList);
  const playingMatches = useMemo(() => {
    const matchDetails = _.compact(matchHistory.map((match) => match.detail));
    return new Map(
      gameList.map((game) => [
        game,
        matchDetails.filter((match) => match.gameName === game),
      ])
    );
  }, [gameList, matchHistory]);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlayingMatches());
  }, [dispatch]);

  useEffect(() => {
    if (gameList.length > 0) {
      setStatus("success");
    }
  }, [gameList.length]);

  return (
    <StyledComponent
      {...props}
      status={status}
      games={gameList}
      playingMatches={playingMatches}
    />
  );
};

export { SlashchainClient };

export const gameComponents = {
  top: GameTopComponent,
  match: GameMatchComponent,
  games: {
    slashchain: {
      game: Slashchain,
      board: SlashchainClient,
    },
  },
} as const;
