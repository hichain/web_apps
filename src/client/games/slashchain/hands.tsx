import React, { FC } from "react";
import { TileComponent } from "./tile";
import { Tile } from "@games";
import styled from "styled-components";

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
            <div
              className="tile picked"
              key={`${playerID}:${i}`}
              onClick={() => props.rotate(i, 1)}
            >
              <TileComponent tile={tile} dir={props.pickedTile.dir} />
            </div>
          ) : (
            <div
              className="tile pickable"
              key={`${playerID}:${i}`}
              onClick={() => props.pick(i)}
            >
              <TileComponent tile={tile} />
            </div>
          );
        } else {
          return (
            <div className="tile" key={`${playerID}:${i}`}>
              <TileComponent tile={tile} />
            </div>
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
  width: 60%;
  margin: 3em auto;

  .tile {
    width: 60px;
    height: 60px;
    margin: 0.6em;
    object-fit: contain;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #555;
      transition: transform 0.12s;
    }

    &.pickable {
      transition: 0.08s;
      transition-timing-function: ease-in-out;

      &:hover {
        width: 80px;
        height: 80px;
      }
    }

    &.picked {
      width: 80px;
      height: 80px;

      img {
        border-width: 2.2px;
      }
    }
  }
`;

export const HandsComponent: FC<ContainerProps> = (props) => (
  <StyledComponent {...props} />
);
