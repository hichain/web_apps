import React, { FC, useContext } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandTileComponent } from "./hand_tile";
import { images } from "@images";
import { CellComponent } from "./cell";
import { GameContext } from "./tabletop";

const playerImages = images.slashchain.players;

type ContainerProps = {
  className?: string;
  children?: never;
  hands: Tile[];
  player: NamedPlayer;
};

type PresenterProps = {
  isOtherTurn: boolean;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, hands, player, isOtherTurn }) => {
  return (
    <div className={className}>
      <div className="hands">
        {hands.map((tile, i) => (
          <HandTileComponent
            key={`${player}:${i}`}
            tile={tile}
            index={i}
            state="fixed"
          />
        ))}
      </div>
      <CellComponent
        isFocused={false}
        className={["player-info", isOtherTurn ? "other-turn" : ""].join(" ")}
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
    border: 2px solid #222;
    opacity: 0.6;

    &.other-turn {
      opacity: 1;
    }
    & > img {
      height: 100%;
    }
  }
`;

export const OtherFieldComponent: FC<ContainerProps> = (props) => {
  const context = useContext(GameContext);
  const isOtherTurn = !context?.isMyTurn;
  return <StyledComponent {...props} isOtherTurn={isOtherTurn} />;
};
