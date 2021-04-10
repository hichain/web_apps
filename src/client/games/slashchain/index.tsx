import React, { FC, useCallback, useEffect } from "react";
import styled from "styled-components";
import { LobbyClient } from "boardgame.io/client";
import { envs } from "@/envs";
import { Slashchain } from "@/games";
import { useHistory } from "react-router";

export { App as SlashchainApp } from "./app";

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

  const createMatch = useCallback(async () => {
    const lobbyClient = new LobbyClient({ server: envs?.lobby?.url });
    const { matchID } = await lobbyClient.createMatch(Slashchain.name, {
      numPlayers: 2,
    });
    return matchID;
  }, []);

  useEffect(() => {
    createMatch().then((matchID) =>
      history.push(`/games/slashchain/${matchID}`)
    );
  });

  return <StyledComponent>Joining...</StyledComponent>;
};
