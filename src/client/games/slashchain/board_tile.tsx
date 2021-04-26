import React, { FC, useContext } from "react";
import styled from "styled-components";
import { Tile } from "@/games/slashchain";
import { CellComponent } from "./cell";
import { TileComponent } from "./tile";
import { Cell } from "@/games";
import { GameContext } from "@/client/contexts/game";
import { PlayerContext } from "@/client/contexts/player";

type ContainerProps = {
  className?: string;
  children?: never;
  columns: number;
  cell: Cell;
  tile?: Tile;
  isFocused: boolean;
  isLegal: boolean;
};

type PresenterProps = {
  onClick: () => void;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  tile,
  isFocused,
  isLegal,
  onClick,
}) => {
  return (
    <CellComponent
      className={[isLegal ? "available" : "", className ?? ""].join(" ")}
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
    cursor: pointer;
    background-color: #ccc;
  }
`;
export const BoardTileComponent: FC<ContainerProps> = (props) => {
  const game = useContext(GameContext);
  const { dispatch } = useContext(PlayerContext);
  const presenterProps: PresenterProps = {
    onClick: () => {
      if (game?.isMyTurn && props.isLegal) {
        dispatch?.({
          type: "put_tile",
          payload: {
            cell: props.cell,
          },
        });
      }
    },
  };
  return <StyledComponent {...props} {...presenterProps} />;
};
