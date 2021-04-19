import React, { FC } from "react";
import { TileComponent } from "./tile";
import { Tile } from "@games";
import styled from "styled-components";
import { StyledCell } from "./cell";

export type Hand = {
  index: number;
  dir?: number;
};

type ContainerProps = {
  className?: string;
  children?: never;
  hands: Tile[];
  playerID: string;
} & (
  | {
      pickable: false;
    }
  | {
      pickable: true;
      pickedTile?: Hand;
      pick: (index: number) => void;
      rotate: (index: number, dir: number) => void;
    }
);

type PresenterProps = Record<string, unknown>;

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, hands, playerID, ...props }) => {
  return (
    <div className={className}>
      {hands.map((tile, i) => {
        if (props.pickable) {
          return props.pickedTile?.index === i ? (
            <StyledCell
              className="tile picked"
              key={`${playerID}:${i}`}
              onClick={() => props.rotate(i, 1)}
            >
              <TileComponent tile={tile} dir={props.pickedTile.dir} />
            </StyledCell>
          ) : (
            <StyledCell
              className="tile pickable"
              key={`${playerID}:${i}`}
              onClick={() => props.pick(i)}
            >
              <TileComponent tile={tile} />
            </StyledCell>
          );
        } else {
          return (
            <StyledCell className="tile" key={`${playerID}:${i}`}>
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

    img {
      transition: transform 0.12s;
    }

    &.pickable {
      transition: 0.08s;
      transition-timing-function: ease-in-out;

      &:hover {
        box-shadow: 0 2px 8px 1px rgb(64 60 67 / 48%);
      }
    }

    &.picked {
      border-color: #8a8a8a;
      box-shadow: 0 2px 8px 1px rgb(64 60 67 / 48%);
    }
  }
`;

export const HandsComponent: FC<ContainerProps> = (props) => (
  <StyledComponent {...props} />
);
