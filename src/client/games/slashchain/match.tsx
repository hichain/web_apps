import React, { FC, useEffect } from "react";
import { Slashchain } from "@/games";
import { Client } from "./client";
import { lobbyClient } from "@/client/lobby/client";
import { useHistory } from "react-router";
import { Player, useMatchHistory } from "@/client/hooks/useMatchHistory";

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
  const [matchHistory, dispatch] = useMatchHistory();

  useEffect(() => {
    const match = matchHistory[matchID];
    if (match) {
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
            dispatch({
              type: "add_match",
              payload: {
                matchID,
                player: {
                  id: playerID,
                  credentials: playerCredentials,
                },
              },
            });
          })
          .catch(() => {
            history.replace("/");
          });
      })
      .catch(() => {
        history.replace("/");
      });
  }, [matchID, history, matchHistory, dispatch]);
  return <DomComponent {...props} player={matchHistory[matchID]} />;
};
