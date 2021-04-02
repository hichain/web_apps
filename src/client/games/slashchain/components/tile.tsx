import React, { FC } from "react";
import square from "@images/slashchain/square.png";
import arrow from "@images/slashchain/arrow.png";
import pin from "@images/slashchain/pin.png";
import cross from "@images/slashchain/cross.png";
import power from "@images/slashchain/power.png";
import parallel from "@images/slashchain/parallel.png";
import { NamedTile, Tile } from "@/client/games/slashchain/tile";
import { tileParser } from "@/client/games/slashchain/tiles";
import styled from "styled-components";

const tileImages: { [key: string]: string } = {
  square,
  arrow,
  pin,
  cross,
  power,
  parallel,
};

type ContainerProps = {
  className?: string;
  children?: never;
  tile: Tile;
  dir?: number;
};

type PresenterProps = {
  namedTile: NamedTile;
  dir: number;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, dir, namedTile }) => {
  const imageUrl = tileImages[namedTile.name];
  if (imageUrl == null) {
    return (
      <span className={className}>
        Unknown (${namedTile.name}:${dir})
      </span>
    );
  }
  return (
    <span className={className}>
      <img src={imageUrl} alt={namedTile.name} />
    </span>
  );
};

const StyledComponent = styled(DomComponent)`
  img {
    width: 100%;
    transform: rotate(${({ dir }) => 90 * dir}deg);
  }
`;

export const TileComponent: FC<ContainerProps> = (props) => {
  const namedTile = tileParser.parse(props.tile);
  if (namedTile == null) {
    return <div>Unknown ({props.tile.toString(16)})</div>;
  }
  return (
    <StyledComponent
      {...props}
      namedTile={namedTile}
      dir={props.dir ?? namedTile.dir}
    />
  );
};
