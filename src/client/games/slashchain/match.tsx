import React, { FC, useCallback, useEffect } from "react";
import { Slashchain } from "@/games";
import { Client } from "./client";
import { lobbyClient } from "@/client/lobby/client";
import { useHistory } from "react-router";
import { useMatchHistory } from "@/client/hooks/useMatchHistory";
import { routes } from "@routes";

type ContainerProps = {
  children?: never;
  className?: string;
  matchID: string;
};

type PresenterProps = {
  playerID?: string;
  credentials?: string;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  matchID,
  playerID,
  credentials,
}) => (
  <div className={className}>
    <Client matchID={matchID} playerID={playerID} credentials={credentials} />
  </div>
);

export const GameMatchComponent: FC<ContainerProps> = ({
  matchID,
  ...props
}) => {
  const history = useHistory();
  const [matchHistory, dispatch] = useMatchHistory();
  const match = matchHistory.find((match) => match.matchID === matchID);

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

  // TODO: migrate it to redux=saga
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
      return { id: playerID, gameID: gameName, credentials: playerCredentials };
    },
    [getMatch, joinMatch]
  );

  useEffect(() => {
    if (match) {
      return;
    }

    getPlayer(matchID)
      .then((player) => {
        dispatch({
          type: "add_match",
          payload: {
            matchID,
            gameID: player.gameID,
            playerID: player.id,
            credentials: player.credentials,
          },
        });
      })
      .catch(() => history.replace(routes.gameList));
  }, [matchHistory, dispatch, getPlayer, history, match, matchID]);

  return (
    <DomComponent
      {...props}
      matchID={matchID}
      playerID={match?.playerID}
      credentials={match?.credentials}
    />
  );
};
