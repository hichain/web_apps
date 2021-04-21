import React, { FC } from "react";
import styled from "styled-components";
import { Tile } from "@/games/slashchain";
import { StyledCell } from "./cell";
import { TileComponent } from "./tile";
import { Cell } from "@/games";

export type HandState = "picked" | "pickable" | "fixed";

type ContainerProps = {
  className?: string;
  children?: never;
  columns: number;
  cell: Cell;
  tile?: Tile;
  onClick?: () => void;
};

type PresenterProps = Record<string, unknown>;

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, cell, tile, onClick }) => {
  return (
    <StyledCell
      className={[onClick ? "available" : "", className ?? ""].join(" ")}
      key={`${cell.x},${cell.y}`}
      data-x={cell.x}
      data-y={cell.y}
      onClick={() => onClick?.()}
    >
      {tile != null && <TileComponent className="tile" tile={tile} angle={0} />}
    </StyledCell>
  );
};

const StyledComponent = styled(DomComponent)`
  box-sizing: content-box;
  background-color: #fff;
  border: 0.1rem dashed #aaa;
  border-right: 0;
  border-bottom: 0;

  &:nth-child(n + 1):nth-child(-n + ${({ columns }) => columns}) {
    border-top: 0;
  }
  &:nth-child(${({ columns }) => columns}n + 1) {
    border-left: 0;
  }

  &.available {
    background-color: #ccc;
  }
`;

export const BoardTileComponent: FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
