import React, { FC } from "react";
import styled from "styled-components";
import { DefaultRotatedTile, getAngle, Tile, toRotatedTile } from "@games";
import { images } from "@images";

const tileImages = images.games.slashchain.tiles;

type ContainerProps = {
  className?: string;
  children?: never;
  tile: Tile;
  angle: number;
};

type PresenterProps = {
  rotatedTile: DefaultRotatedTile;
  imageUrl?: string;
};

type Props = ContainerProps & PresenterProps;

const DomComponent: FC<Props> = ({
  className,
  rotatedTile,
  imageUrl,
  angle,
}) => {
  const name = `${rotatedTile}:${angle}`;
  if (imageUrl == null) {
    return <div className={className}>{`No Image (${name})`}</div>;
  }
  return (
    <div className={className}>
      <img src={imageUrl} alt={name} />
    </div>
  );
};

const StyledComponent = styled(DomComponent)`
  font-size: 1.2rem;
  word-break: break-all;

  img {
    width: 100%;
    transform: rotate(${({ angle }) => 90 * angle}deg);
    transform-origin: center;
  }
`;

export const TileComponent: FC<ContainerProps> = (props) => {
  const rotatedTile = toRotatedTile(props.tile);
  const { tile, angle } = getAngle(rotatedTile);
  const imageUrl = tileImages[tile];

  return (
    <StyledComponent
      {...props}
      rotatedTile={tile}
      imageUrl={imageUrl}
      angle={props.angle + angle}
    />
  );
};
