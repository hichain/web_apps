import React, { FC, useContext, useMemo } from "react";
import styled from "styled-components";
import { NamedPlayer, Tile } from "@/games/slashchain/";
import { HandState } from "./hand_tile";
import { HandsComponent } from "./hands";
import { PlayerInfoComponent } from "./player_info";
import { GameContext } from "@contexts/game";

type ContainerProps = {
  className?: string;
  children?: never;
  tiles: Tile[];
  player: NamedPlayer;
};

type PresenterProps = {
  isOtherTurn: boolean;
  hands: { tile: Tile; state: HandState }[];
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, hands, player, isOtherTurn }) => {
  return (
    <div className={className}>
      <HandsComponent player={player} hands={hands} />
      <PlayerInfoComponent player={player} isMyTurn={isOtherTurn} />
    </div>
  );
};

const StyledComponent = styled(DomComponent)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  transform: rotate(180deg);
`;

export const OtherFieldComponent: FC<ContainerProps> = (props) => {
  const game = useContext(GameContext);
  const isOtherTurn = game?.isMyTurn === false;
  const presenterProps: PresenterProps = {
    isOtherTurn,
    hands: useMemo(
      () => props.tiles.map((tile) => ({ tile, state: "fixed" })),
      [props.tiles]
    ),
  };

  return <StyledComponent {...props} {...presenterProps} />;
};
