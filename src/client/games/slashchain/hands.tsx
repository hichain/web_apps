import React, { FC } from "react";
import { TileComponent } from "./tile";
import styled from "styled-components";
import { StyledCell } from "./cell";
import { NamedPlayer, Tile } from "@/games/slashchain/";

export type Hand = {
  index: number;
  dir?: number;
};

type ContainerProps = {
  className?: string;
  children?: never;
  hands: Tile[];
  player: NamedPlayer;
  pickedTile?: Hand;
  moves?: {
    pick: (index: number) => void;
    rotate: (index: number, dir: number) => void;
  };
};

type PresenterProps = Record<string, unknown>;

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, hands, player, ...props }) => {
  return (
    <div className={className}>
      {hands.map((tile, i) => {
        if (props.moves) {
          return props.pickedTile?.index === i ? (
            <StyledCell
              className="tile picked"
              key={`${player}:${i}`}
              onClick={() => props.moves?.rotate(i, 1)}
            >
              <TileComponent tile={tile} dir={props.pickedTile.dir} />
            </StyledCell>
          ) : (
            <StyledCell
              className="tile pickable"
              key={`${player}:${i}`}
              onClick={() => props.moves?.pick(i)}
            >
              <TileComponent tile={tile} />
            </StyledCell>
          );
        } else {
          return (
            <StyledCell className="tile" key={`${player}:${i}`}>
              <TileComponent tile={tile} />
            </StyledCell>
          );
        }
      })}
    </div>
  );
};

const StyledComponent = styled(DomComponent)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  .tile {
    box-sizing: content-box;
    margin: 0.6rem;
    background-color: #fff;
    border: 0.2rem solid transparent;
    box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
    transition: transform 0.12s;
    object-fit: contain;

    &.pickable {
      &:hover {
        box-shadow: 0 2px 8px 1px rgb(64 60 67 / 48%);
      }
    }

    &.picked {
      border-color: #8a8a8a;
      box-shadow: 0 2px 8px 1px rgb(64 60 67 / 48%);

      img {
        transition: transform 0.12s;
        transition-timing-function: ease-in-out;
      }
    }
  }
`;

export const HandsComponent: FC<ContainerProps> = (props) => (
  <StyledComponent {...props} />
);
