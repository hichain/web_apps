import { GameComponent } from "boardgame.io/dist/types/src/lobby/connection";
import { Lobby } from "boardgame.io/react";
import React, { FC } from "react";
import styled from "styled-components";
import { gameComponents } from "./games";
import { lobbyServerURL } from "./lobby/client";

type ContainerProps = {
  className?: string;
  children?: never;
};

type PresenterProps = {
  gameComponents: GameComponent[];
  gameServer?: string;
  lobbyServer?: string;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  gameComponents,
  gameServer,
  lobbyServer,
}) => (
  <div className={className}>
    <Lobby {...{ gameComponents, gameServer, lobbyServer }} />
  </div>
);

const StyledComponent = styled(DomComponent)`
  background: #fff;
`;

export const DebugComponent: React.FC<ContainerProps> = (props) => {
  return (
    <StyledComponent
      {...props}
      gameComponents={Object.values(gameComponents.games)}
      gameServer={lobbyServerURL}
      lobbyServer={lobbyServerURL}
    />
  );
};
