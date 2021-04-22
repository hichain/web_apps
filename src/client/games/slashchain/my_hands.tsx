import React, { FC } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandTileComponent } from "./hand_tile";
import { images } from "@images";
import { StyledCell } from "./cell";

const playerImages = images.slashchain.players;

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
      <div className="hands">
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
      <StyledCell className="player-info">
        <img src={playerImages[player]} alt={player} />
      </StyledCell>
    </div>
  );
};

const StyledComponent = styled(DomComponent)`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  > .hands {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  > .player-info {
    box-sizing: content-box;
    margin: 0.6rem 0.6rem 0.6rem 3.6rem;
    border: 0.2rem solid #888;
    & > img {
      height: 100%;
    }
  }
`;

export const MyHandsComponent: FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
