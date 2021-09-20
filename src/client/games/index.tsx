import { Slashchain, SupportedGame } from "@/games";
import { routes } from "@routes";
import { strings } from "@strings";
import dayjs from "dayjs";
import React, { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GameTopComponent } from "./game";
import { GameMatchComponent } from "./game/match";
import { useGameList } from "./hooks/useGameList";
import {
  PlayingMatchList,
  usePlayingMatchList,
} from "./hooks/usePlayingMatchList";
import { SlashchainClient } from "./slashchain";

type ContainerProps = {
  children?: never;
  className?: string;
};

type PresenterProps = {
  games: SupportedGame[];
  playingMatchList: PlayingMatchList;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, games, playingMatchList }) => {
  const GameList = useMemo(() => {
    return games
      .map((game) => [game, playingMatchList.get(game)] as const)
      .map(([game, matches], i) => (
        <div className="game_info" key={i}>
          <h2>{strings.games[game] ?? "Unknown Game"}</h2>
          <h3>Playing Match List</h3>
          <ul className="playing_match_list">
            {!matches?.length ? (
              <li>No Matches Found.</li>
            ) : (
              matches.map((match) => (
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
  }, [games, playingMatchList]);

  return (
    <div className={className}>
      <h1>Games</h1>
      <div className="games">{GameList}</div>
    </div>
  );
};

const StyledComponent = styled(DomComponent)`
  h1 {
    margin: 2.4rem 0 2.4rem 6rem;
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
  const gameList = useGameList();
  const playingMatchList = usePlayingMatchList();

  return (
    <StyledComponent
      {...props}
      games={gameList}
      playingMatchList={playingMatchList}
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
