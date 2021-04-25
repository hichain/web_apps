import React, { FC } from "react";
import styled from "styled-components";
import { Tile } from "@/games/slashchain";
import { CellComponent } from "./cell";
import { TileComponent } from "./tile";

export type HandState = "picked" | "pickable" | "fixed";

type Props = {
  className?: string;
  children?: never;
  columns: number;
  isLegal: boolean;
  isFocused: boolean;
  tile?: Tile;
  onClick?: () => void;
};

const DomComponent: FC<Props> = ({
  className,
  isLegal,
  tile,
  isFocused,
  onClick,
}) => {
  return (
    <CellComponent
      className={[isLegal ? "available" : "", "cell", className ?? ""].join(
        " "
      )}
      isFocused={isFocused}
      onClick={onClick}
    >
      {tile != null && <TileComponent className="tile" tile={tile} angle={0} />}
    </CellComponent>
  );
};

const StyledComponent = styled(DomComponent)`
  box-sizing: content-box;
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
export const BoardTileComponent: FC<Props> = (props) => {
  return <StyledComponent {...props} />;
};
