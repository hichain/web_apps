import React, { FC, memo, useCallback, useState } from "react";
import styled from "styled-components";
import { Tile } from "@games";
import { TileComponent } from "./tile";
import { CellComponent } from "./cell";
import clsx from "clsx";
import { useAppDispatch } from "@redux/hooks/useAppDispatch";

export type HandState = "picked" | "pickable" | "disabled" | "fixed";

type Props = {
  className?: string;
  children?: never;
  tile: Tile;
  index: number;
  state: HandState;
};

const StyledTileComponent = styled(TileComponent)`
  box-shadow: 0 0 5px 1px rgb(64 60 67 / 16%);

  &.picked {
    outline: 2px solid #8a8a8a;
    box-shadow: 0 0 8px 1px rgb(64 60 67 / 48%);
    transition: transform 0.12s;
    transition-timing-function: ease-in-out;
  }

  &.pickable:hover {
    box-shadow: 0 0 8px 1px rgb(64 60 67 / 48%);
  }
`;

const StyledCellComponent = styled(CellComponent)`
  margin: 0.6rem;
  object-fit: contain;

  &.picked {
    cursor: pointer;
  }

  &.pickable {
    cursor: pointer;
  }

  &.disabled {
    cursor: not-allowed;
  }
`;

const HandTileComponent: FC<Props> = ({ className, state, tile, index }) => {
  const dispatch = useAppDispatch();
  const [angle, setAngle] = useState<number>(0);

  const onClick = useCallback(() => {
    switch (state) {
      case "picked": {
        setAngle(angle + 1);
        dispatch(({ player }) => player.rotateTile({ angle: angle + 1 }));
        break;
      }
      case "pickable": {
        dispatch(({ player }) => player.pickTile({ index, angle }));
        break;
      }
    }
  }, [angle, dispatch, index, state]);

  return (
    <StyledCellComponent
      className={clsx(state, className)}
      isFocused={false}
      onClick={onClick}
    >
      <StyledTileComponent className={state} tile={tile} angle={angle} />
    </StyledCellComponent>
  );
};

const MemorizedHandTileComponent = memo(HandTileComponent);

export { MemorizedHandTileComponent as HandTileComponent };
