import React, { FC, memo } from "react";
import styled from "styled-components";
import { NamedPlayer } from "@games";
import { images } from "@images";
import { CellComponent } from "./cell";
import clsx from "clsx";

const playerImages = images.games.slashchain.players;

type Props = {
  className?: string;
  children?: never;
  player: NamedPlayer;
  isMyTurn: boolean;
};

const StyledPlayerInfo = styled.div<{ player: NamedPlayer }>`
  width: inherit;
  height: inherit;
  background-image: url(${({ player }) => playerImages[player]});
  background-repeat: no-repeat;
  background-size: contain;
  outline: 2px solid #222;
  opacity: 0.6;

  &.my-turn {
    opacity: 1;
  }
`;

const PlayerInfo: FC<Props> = ({ className, player, isMyTurn }) => {
  return (
    <CellComponent isFocused={false} className={className}>
      <StyledPlayerInfo
        className={clsx({ "my-turn": isMyTurn })}
        player={player}
      />
    </CellComponent>
  );
};

const MemorizedPlayerInfo = memo(PlayerInfo);

export { MemorizedPlayerInfo as PlayerInfoComponent };
