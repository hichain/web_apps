import React, { FC, useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { Tile } from "@/games/slashchain";
import { TileComponent } from "./tile";
import { CellComponent } from "./cell";
import { PlayerContext } from "@/client/contexts/player";

export type HandState = "picked" | "pickable" | "disabled" | "fixed";

type ContainerProps = {
  className?: string;
  children?: never;
  tile: Tile;
  index: number;
  state: HandState;
};

type PresenterProps = {
  angle: number;
  onClick: () => void;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, tile, angle, onClick }) => {
  return (
    <CellComponent className={className} isFocused={false} onClick={onClick}>
      <TileComponent tile={tile} angle={angle} />
    </CellComponent>
  );
};

const StyledComponent = styled(DomComponent)`
  margin: 0.6rem;
  background-color: #fff;
  border: 2px solid transparent;
  box-shadow: 0 0 5px 1px rgb(64 60 67 / 16%);
  transition: transform 0.12s;
  object-fit: contain;

  &.pickable {
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 8px 1px rgb(64 60 67 / 48%);
    }
  }

  &.picked {
    cursor: pointer;
    border-color: #8a8a8a;
    box-shadow: 0 0 8px 1px rgb(64 60 67 / 48%);

    img {
      transition: transform 0.12s;
      transition-timing-function: ease-in-out;
    }
  }

  &.disabled {
    cursor: not-allowed;
  }
`;

export const HandTileComponent: FC<ContainerProps> = (props) => {
  const { dispatch } = useContext(PlayerContext);
  const [angle, setAngle] = useState<number>(0);

  const className = props.state;

  const onClick = useCallback(() => {
    switch (props.state) {
      case "picked": {
        setAngle(angle + 1);
        dispatch?.({
          type: "rotate_tile",
          payload: { angle: angle + 1 },
        });
        break;
      }
      case "pickable": {
        dispatch?.({
          type: "pick_tile",
          payload: { index: props.index, angle },
        });
        break;
      }
    }
  }, [angle, dispatch, props.index, props.state]);
  return (
    <StyledComponent
      {...props}
      className={className}
      angle={angle}
      onClick={onClick}
    />
  );
};
