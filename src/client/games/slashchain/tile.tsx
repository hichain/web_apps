import React, { FC } from "react";
import styled from "styled-components";
import { rotate, RotatedTile, Tile, toRotatedTile } from "@/games/slashchain";
import { images } from "@images";

const tileImages = images.slashchain.tiles;

type ContainerProps = {
  className?: string;
  children?: never;
  tile: Tile;
  dir?: number;
};

type PresenterProps = {
  rotatedTile: RotatedTile;
  dir: number;
  imageUrl?: string;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({ className, rotatedTile, imageUrl, dir }) => {
  const name = `${rotatedTile}:${dir}`;
  if (imageUrl == null) {
    return <span className={className}>{`No Image (${name}`}</span>;
  }
  return (
    <span className={className}>
      <img src={imageUrl} alt={name} />
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
  const dir = props.dir ?? 0;
  const rotatedTile = toRotatedTile(rotate(props.tile, dir * -1));
  const imageUrl = tileImages[rotatedTile];

  return (
    <StyledComponent
      {...props}
      rotatedTile={rotatedTile}
      imageUrl={imageUrl}
      dir={dir}
    />
  );
};
