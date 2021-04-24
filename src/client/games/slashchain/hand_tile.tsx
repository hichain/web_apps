import React, { FC, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Tile } from "@/games/slashchain";
import { TileComponent } from "./tile";
import { PickedHand } from "./my_hands";
import { CellComponent } from "./cell";

type ContainerProps = {
  className?: string;
  children?: never;
  tile: Tile;
  index: number;
  isPicked: boolean;
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
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  transition: transform 0.12s;
  object-fit: contain;

  &.pickable:hover {
    box-shadow: 0 2px 8px 1px rgb(64 60 67 / 48%);
  }

  &.picked {
    border-color: #8a8a8a;
    box-shadow: 0 2px 8px 1px rgb(64 60 67 / 48%);

    img {
      transition: transform 0.12s;
      transition-timing-function: ease-in-out;
    }
  }
`;

export const HandTileComponent: FC<ContainerProps> = (props) => {
  const [angle, setAngle] = useState<number>(0);

  const className = useMemo(() => {
    if (props.isPicked) {
      return "picked";
    } else if (props.pickTile) {
      return "pickable";
    } else {
      return "fixed";
    }
  }, [props.isPicked, props.pickTile]);

  const onClick = useCallback(() => {
    if (props.isPicked) {
      setAngle(angle + 1);
      props.pickTile?.({ index: props.index, angle: angle + 1 });
    } else {
      props.pickTile?.({ index: props.index, angle });
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
