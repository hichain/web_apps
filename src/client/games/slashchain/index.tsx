import React, { FC } from "react";
import styled from "styled-components";

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
  return <StyledComponent>Joining...</StyledComponent>;
};
