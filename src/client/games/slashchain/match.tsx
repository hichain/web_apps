import React, { FC, useCallback, useEffect } from "react";
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
  const history = useHistory();
  const [matchHistory, dispatch] = useMatchHistory();

  const getMatch = useCallback(
    (matchID: string) => lobbyClient.getMatch(Slashchain.name, matchID),
    []
  );

  const joinMatch = useCallback(
    (gameName: string, matchID: string, playerID: string) =>
      lobbyClient.joinMatch(gameName, matchID, {
        playerID,
        playerName: playerID,
      }),
    []
  );

  const getPlayer = useCallback(
    async (matchID: string) => {
      const { gameName, players } = await getMatch(matchID);
      const numPlayers = players.filter((player) => player.name != null).length;
      const playerID = `${numPlayers}`;
      const { playerCredentials } = await joinMatch(
        gameName,
        matchID,
        playerID
      );
      return { id: playerID, credentials: playerCredentials };
    },
    [getMatch, joinMatch]
  );

  useEffect(() => {
    const { matchID } = props;
    const match = matchHistory[matchID];
    if (match) {
      return;
    }

    getPlayer(matchID)
      .then((player) => {
        dispatch({
          type: "add_match",
          payload: {
            matchID,
            player,
          },
        });
      })
      .catch(() => history.replace("/"));
  }, [matchHistory, dispatch, getPlayer, props, history]);

  return <DomComponent {...props} player={matchHistory[props.matchID]} />;
};
