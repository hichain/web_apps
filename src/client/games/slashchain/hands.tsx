import React, { FC, memo } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandState, HandTileComponent } from "./hand_tile";

type ContainerProps = {
  className?: string;
  children?: never;
  hands: { tile: Tile; state: HandState }[];
  player: NamedPlayer;
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

export const HandsComponent = memo(StyledComponent);
