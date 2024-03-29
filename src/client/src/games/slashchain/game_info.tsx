import React, { FC, memo } from "react";
import styled from "styled-components";
import { strings } from "@strings";
import { Button } from "@mui/material";

type Props = {
  className?: string;
  children?: never;
  events: {
    resetGame: () => void; // TODO: fix turn order
  };
};

const DomComponent: FC<Props> = ({ className, events }) => (
  <div className={className}>
    <Button size="medium" variant="outlined" onClick={() => events.resetGame()}>
      {strings.events.resetGame}
    </Button>
  </div>
);

const StyledComponent = styled(DomComponent)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const GameInfoComponent = memo(StyledComponent);
