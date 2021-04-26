import React, { FC, useContext, useMemo } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandState } from "./hand_tile";
import { HandsComponent } from "./hands";
import { PlayerInfoComponent } from "./player_info";
import { GameContext } from "@contexts/game";
import { PlayerContext } from "@contexts/player";

type ContainerProps = {
  className?: string;
  children?: never;
  tiles: Tile[];
  player: NamedPlayer;
};

type PresenterProps = {
  isMyTurn: boolean;
  hands: { tile: Tile; state: HandState }[];
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, hands, player, isMyTurn }) => {
  return (
    <div className={className}>
      <HandsComponent player={player} hands={hands} />
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
  const game = useContext(GameContext);
  const isMyTurn = game?.isMyTurn ?? false;
  const { pickedTile } = useContext(PlayerContext);

  const presenterProps: PresenterProps = {
    isMyTurn,
    hands: useMemo(
      () =>
        props.tiles.map((tile, i) => {
          if (pickedTile?.index === i) {
            return { tile, state: "picked" };
          } else if (isMyTurn) {
            return { tile, state: "pickable" };
          } else {
            return { tile, state: "disabled" };
          }
        }),
      [props.tiles, pickedTile?.index, isMyTurn]
    ),
  };

  return <StyledComponent {...props} {...presenterProps} />;
};
