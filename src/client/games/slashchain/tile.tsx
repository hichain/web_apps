import React, { FC } from "react";
import square from "@images/slashchain/square.svg";
import arrow from "@images/slashchain/arrow.svg";
import pin from "@images/slashchain/pin.svg";
import cross from "@images/slashchain/cross.svg";
import power from "@images/slashchain/power.svg";
import parallel from "@images/slashchain/parallel.svg";
import { NamedTile, Tile, tileParser } from "@games";
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
  imageUrl?: string;
  dir: number;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, imageUrl, dir, namedTile }) => {
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
    transform-origin: center;
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
      imageUrl={tileImages[namedTile.name]}
      dir={props.dir ?? namedTile.dir}
    />
  );
};
