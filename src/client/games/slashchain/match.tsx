import React, { FC, useEffect } from "react";
import { Slashchain } from "@/games";
import { Client } from "./client";
import { lobbyClient } from "@/client/lobby/client";
import { useHistory } from "react-router";
import { Player, usePlayer } from "@/client/hooks/usePlayer";

type ContainerProps = {
  children?: never;
  className?: string;
  matchID: string;
};

type PresenterProps = {
  player?: Player;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, matchID, player }) => (
  <div className={className}>
    <Client
      matchID={matchID}
      playerID={player?.id}
      credentials={player?.credentials}
    />
  </div>
);

export const GameMatchComponent: FC<ContainerProps> = (props) => {
  const { matchID } = props;
  const history = useHistory();
  const [player, setPlayer] = usePlayer();

  useEffect(() => {
    if (player) {
      return;
    }

    lobbyClient
      .getMatch(Slashchain.name, matchID)
      .then(({ gameName, players }) => {
        const numPlayers = players.filter((player) => player.name != null)
          .length;
        const playerID = `${numPlayers}`;
        lobbyClient
          .joinMatch(gameName, matchID, {
            playerID,
            playerName: playerID,
          })
          .then(({ playerCredentials }) => {
            setPlayer({ id: playerID, credentials: playerCredentials });
          })
          .catch(() => {
            history.push("/");
          });
      })
      .catch(() => {
        history.push("/");
      });
  }, [matchID, history, player, setPlayer]);
  return <DomComponent {...props} player={player} />;
};
