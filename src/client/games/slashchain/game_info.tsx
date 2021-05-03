import React, { FC, memo } from "react";
import styled from "styled-components";
import { strings } from "@/client/assets/strings";

type Props = {
  className?: string;
  children?: never;
  events: {
    resetGame: () => void;
  };
};

const DomComponent: FC<Props> = ({ className, events }) => (
  <div className={className}>
    <button onClick={() => events.resetGame()}>
      {strings.events.resetGame}
    </button>
  </div>
);

const StyledComponent = styled(DomComponent)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > button {
    font-size: 1.4rem;
  }
`;

export const GameInfoComponent = memo(StyledComponent);
