import React, { FC, memo, useCallback } from "react";
import styled from "styled-components";
import { Tile } from "@/games/slashchain";
import { CellComponent } from "./cell";
import { TileComponent } from "./tile";
import { Cell } from "@/games";
import clsx from "clsx";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { putTile } from "@redux/modules/player";

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
      className={clsx({ legal: isLegal }, className)}
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

  &.legal {
    cursor: pointer;
    background-color: #ccc;
  }
`;

const Component: FC<ContainerProps> = (props) => {
  const dispatch = useAppDispatch();
  const presenterProps: PresenterProps = {
    onClick: useCallback(() => {
      if (props.isLegal) {
        dispatch(putTile({ cell: props.cell }));
      }
    }, [dispatch, props.cell, props.isLegal]),
  };
  return <StyledComponent {...props} {...presenterProps} />;
};

export const BoardTileComponent = memo(Component);
