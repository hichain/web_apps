import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";
import { Tile } from "@/games/slashchain";
import { TileComponent } from "./tile";
import { PickedHand } from "./my_field";
import { CellComponent } from "./cell";

export type HandState = "picked" | "pickable" | "disabled" | "fixed";

type ContainerProps = {
  className?: string;
  children?: never;
  tile: Tile;
  index: number;
  state: HandState;
  pickTile?: React.Dispatch<React.SetStateAction<PickedHand | undefined>>;
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
  const [angle, setAngle] = useState<number>(0);

  const className = props.state;

  const onClick = useCallback(() => {
    switch (props.state) {
      case "picked": {
        setAngle(angle + 1);
        props.pickTile?.({ index: props.index, angle: angle + 1 });
        break;
      }
      case "pickable": {
        props.pickTile?.({ index: props.index, angle });
        break;
      }
    }
  }, [angle, props]);
  return (
    <StyledComponent
      {...props}
      className={className}
      angle={angle}
      onClick={onClick}
    />
  );
};
