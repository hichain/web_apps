import React, { FC, useCallback, useContext } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandState, HandTileComponent } from "./hand_tile";
import { images } from "@images";
import { CellComponent } from "./cell";
import { GameContext } from "./tabletop";

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

type PresenterProps = {
  isMyTurn: boolean;
  handState: (index: number) => HandState;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  hands,
  player,
  pickTile,
  handState,
  isMyTurn,
}) => {
  return (
    <div className={className}>
      <div className="hands">
        {hands.map((tile, i) => (
          <HandTileComponent
            key={`${player}:${i}`}
            tile={tile}
            index={i}
            state={handState(i)}
            pickTile={pickTile}
          />
        ))}
      </div>
      <CellComponent
        isFocused={false}
        className={["player-info", isMyTurn ? "my-turn" : ""].join(" ")}
      >
        <img src={playerImages[player]} alt={player} />
      </CellComponent>
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
    margin: 0.6rem 0 0.3rem 3.6rem;
    border: 2px solid #222;
    opacity: 0.6;

    &.my-turn {
      opacity: 1;
    }
    & > img {
      height: 100%;
    }
  }
`;

export const MyFieldComponent: FC<ContainerProps> = (props) => {
  const context = useContext(GameContext);
  const isMyTurn = context?.isMyTurn ?? false;
  const handState = useCallback(
    (index: number): HandState => {
      if (props.pickedTileIndex === index) {
        return "picked";
      } else if (isMyTurn) {
        return "pickable";
      } else {
        return "disabled";
      }
    },
    [isMyTurn, props.pickedTileIndex]
  );
  return (
    <StyledComponent {...props} isMyTurn={isMyTurn} handState={handState} />
  );
};
