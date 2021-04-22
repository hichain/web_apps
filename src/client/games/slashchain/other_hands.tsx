import React, { FC } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandTileComponent } from "./hand_tile";

type ContainerProps = {
  className?: string;
  children?: never;
  hands: Tile[];
  player: NamedPlayer;
};

type PresenterProps = Record<string, unknown>;

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, hands, player, handState }) => {
  return (
    <div className={className}>
      {hands.map((tile, i) => (
        <HandTileComponent
          key={`${player}:${i}`}
          tile={tile}
          index={i}
          isPicked={false}
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
  transform: rotate(180deg);
`;

export const OtherHandsComponent: FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
