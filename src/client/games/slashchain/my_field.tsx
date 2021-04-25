import React, { FC, useContext, useMemo } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandState } from "./hand_tile";
import { GameContext } from "./tabletop";
import { HandsComponent, PickedHand } from "./hands";
import { PlayerInfoComponent } from "./player_info";

type ContainerProps = {
  className?: string;
  children?: never;
  tiles: Tile[];
  player: NamedPlayer;
  pickedTileIndex?: number;
  pickTile?: React.Dispatch<React.SetStateAction<PickedHand | undefined>>;
};

type PresenterProps = {
  isMyTurn: boolean;
  hands: { tile: Tile; state: HandState }[];
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  hands,
  player,
  pickTile,
  isMyTurn,
}) => {
  return (
    <div className={className}>
      <HandsComponent
        player={player}
        hands={hands}
        pickTile={pickTile}
      />
      <PlayerInfoComponent player={player} isMyTurn={isMyTurn} />
    </div>
  );
};

const StyledComponent = styled(DomComponent)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const MyFieldComponent: FC<ContainerProps> = (props) => {
  const context = useContext(GameContext);
  const isMyTurn = context?.isMyTurn ?? false;
  const presenterProps: PresenterProps = {
    isMyTurn,
    hands: useMemo(
      () =>
        props.tiles.map((tile, i) => {
          if (props.pickedTileIndex === i) {
            return { tile, state: "picked" };
          } else if (isMyTurn) {
            return { tile, state: "pickable" };
          } else {
            return { tile, state: "disabled" };
          }
        }),
      [isMyTurn, props.tiles, props.pickedTileIndex]
    ),
  };

  return <StyledComponent {...props} {...presenterProps} />;
};
