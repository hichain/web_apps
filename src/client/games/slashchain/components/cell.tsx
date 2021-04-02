import React, { FC } from "react";
import { Tile } from "@/client/games/slashchain/tile";
import { TileComponent } from "./tile";
import styled from "styled-components";

type ContainerProps = {
  className?: string;
  children?: never;
  isLegal: boolean;
  tile?: Tile;
  onClick?: () => void;
};

const StyledCell = styled.td`
  width: 80px;
  height: 80px;
  padding: 0;
  line-height: 0;

  &.available {
    border: 1px solid #555;
  }
`;

export const CellComponent: FC<ContainerProps> = ({
  tile,
  isLegal,
  onClick,
}) => {
  if (tile != null) {
    return (
      <StyledCell className="available">
        <TileComponent tile={tile} />
      </StyledCell>
    );
  }
  if (isLegal) {
    return <StyledCell className="available" onClick={onClick}></StyledCell>;
  }
  return <StyledCell />;
};
