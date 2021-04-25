import React, { FC } from "react";
import styled from "styled-components";
import { NamedPlayer } from "@/games/slashchain/";
import { images } from "@images";
import { CellComponent } from "./cell";

const playerImages = images.slashchain.players;

type ContainerProps = {
  className?: string;
  children?: never;
  player: NamedPlayer;
  isMyTurn: boolean;
};

type PresenterProps = Record<string, unknown>;

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, player, isMyTurn }) => {
  return (
    <CellComponent
      isFocused={false}
      className={[
        className ?? "",
        isMyTurn ? "my-turn" : "",
        "player-info",
      ].join(" ")}
    >
      <img src={playerImages[player]} alt={player} />
    </CellComponent>
  );
};

const StyledComponent = styled(DomComponent)`
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
`;

export const PlayerInfoComponent: FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};
