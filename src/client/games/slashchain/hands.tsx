import React, { FC } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandState, HandTileComponent } from "./hand_tile";

export type PickedHand = { index: number; angle: number };

type ContainerProps = {
  className?: string;
  children?: never;
  hands: { tile: Tile; state: HandState }[];
  player: NamedPlayer;
  pickTile?: React.Dispatch<React.SetStateAction<PickedHand | undefined>>;
};

type PresenterProps = Record<string, unknown>;

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, player, hands, pickTile }) => (
  <div className={className}>
    {hands.map((hand, i) => (
      <HandTileComponent
        key={`${player}:${i}`}
        tile={hand.tile}
        index={i}
        state={hand.state}
        pickTile={pickTile}
      />
    ))}
  </div>
);

const StyledComponent = styled(DomComponent)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const HandsComponent: FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
