import React from "react";
import square from "../images/square.png";
import arrow from "../images/arrow.png";
import pin from "../images/pin.png";
import cross from "../images/cross.png";
import power from "../images/power.png";
import parallel from "../images/parallel.png";
import { NamedTile, Tile } from "../components";
import { tileParser } from "../tiles";

const tileImages: { [key: string]: string } = {
  square,
  arrow,
  pin,
  cross,
  power,
  parallel,
};

export interface TileProps {
  tile: Tile;
  dir?: number;
}

export const TileComponent = (props: TileProps) => {
  const tile = tileParser.parse(props.tile);
  if (tile == null) {
    return <div>Unknown ({props.tile.toString(16)})</div>;
  }
  return NamedTileComponent({
    name: tile.name,
    rotate: props.dir ?? tile.rotate,
  });
};

const NamedTileComponent = (tile: NamedTile) => {
  const imageUrl = tileImages[tile.name];
  if (imageUrl == null) {
    return (
      <div>
        Unknown (${tile.name}:${tile.rotate})
      </div>
    );
  }
  return TileImageComponent(tile, imageUrl);
};

const TileImageComponent = (tile: NamedTile, imageUrl: string) => {
  const style: { [key: string]: string } = {
    transform: `rotate(${90 * tile.rotate}deg)`,
  };
  return <img src={imageUrl} style={style} alt={tile.name} />;
};
