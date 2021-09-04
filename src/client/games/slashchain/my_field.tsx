import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandState } from "./hand_tile";
import { HandsComponent } from "./hands";
import { PlayerInfoComponent } from "./player_info";
import { useAppSelector } from "@hooks/useAppSelector";

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
  const isMyTurn = useAppSelector((state) => state.game.isMyTurn);
  const pickedTile = useAppSelector((state) => state.player.pickedTile);

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
