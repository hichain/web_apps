import React, { FC, useEffect, useState } from "react";
import { Slashchain } from "@/games";
import { Client } from "./app";
import { lobbyClient } from "@/client/lobby/client";
import { useHistory } from "react-router";

type Player = {
  id: string;
  credentials: string;
};

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
  const [player, setPlayer] = useState<Player | undefined>();

  useEffect(() => {
    if (player) {
      return;
    }

    lobbyClient
      .getMatch(Slashchain.name, matchID)
      .then(({ gameName, players }) => {
        const numPlayers = players.filter((player) => player.name != null)
          .length;
        if (numPlayers >= Slashchain.maxPlayers) {
          history.push("/games/slashchain");
          return;
        }

        const playerID = `${numPlayers}`;
        lobbyClient
          .joinMatch(gameName, matchID, {
            playerID,
            playerName: playerID,
          })
          .then(({ playerCredentials }) => {
            setPlayer({ id: playerID, credentials: playerCredentials });
          });
      });
  }, [matchID, player, history]);

  return <DomComponent {...props} player={player} />;
};
