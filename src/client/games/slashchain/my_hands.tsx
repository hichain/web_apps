import React, { FC } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandTileComponent } from "./hand_tile";

export type PickedHand = { index: number; angle: number };

type ContainerProps = {
  className?: string;
  children?: never;
  hands: Tile[];
  player: NamedPlayer;
  pickedTileIndex?: number;
  pickTile?: React.Dispatch<React.SetStateAction<PickedHand | undefined>>;
};

type PresenterProps = Record<string, unknown>;

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  hands,
  player,
  pickedTileIndex,
  pickTile,
}) => {
  return (
    <div className={className}>
      {hands.map((tile, i) => (
        <HandTileComponent
          key={`${player}:${i}`}
          tile={tile}
          index={i}
          isPicked={pickedTileIndex === i}
          pickTile={pickTile}
        />
      ))}
    </div>
  );
};

const StyledComponent = styled(DomComponent)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const MyHandsComponent: FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
