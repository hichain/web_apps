import React, { FC } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandTileComponent } from "./hand_tile";
import { images } from "@images";
import { CellComponent } from "./cell";

const playerImages = images.slashchain.players;

type ContainerProps = {
  className?: string;
  children?: never;
  hands: Tile[];
  player: NamedPlayer;
};

type PresenterProps = Record<string, unknown>;

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, hands, player }) => {
  return (
    <div className={className}>
      <div className="hands">
        {hands.map((tile, i) => (
          <HandTileComponent
            key={`${player}:${i}`}
            tile={tile}
            index={i}
            isPicked={false}
          />
        ))}
      </div>
      <CellComponent isFocused={false} className="player-info">
        <img src={playerImages[player]} alt={player} />
      </CellComponent>
    </div>
  );
};

const StyledComponent = styled(DomComponent)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transform: rotate(180deg);

  > .hands {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  > .player-info {
    box-sizing: content-box;
    margin: 0.6rem 0 0.3rem 3.6rem;
    border: 2px solid #888;
    & > img {
      height: 100%;
    }
  }
`;

export const OtherHandsComponent: FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
