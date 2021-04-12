import React, { FC, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Slashchain } from "@/games";
import { useHistory } from "react-router";
import { lobbyClient } from "@/client/lobby/client";
import { usePlayer } from "@/client/hooks/usePlayer";

type ContainerProps = {
  children?: never;
};

const StyledComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  font-size: 2.4rem;
  transform: translate(-50%, -50%);
`;

export const GameTopComponent: FC<ContainerProps> = () => {
  const history = useHistory();
  const [, setPlayer] = usePlayer();

  const createMatch = useCallback(async () => {
    const { matchID } = await lobbyClient.createMatch(Slashchain.name, {
      numPlayers: 2,
    });
    return matchID;
  }, []);

  useEffect(() => {
    setPlayer(undefined);
    createMatch().then((matchID) =>
      history.push(`/games/slashchain/${matchID}`)
    );
  });

  return <StyledComponent>Creating a match...</StyledComponent>;
};
