import React from "react";
import square from "../images/square.png";
import arrow from "../images/arrow.png";
import pin from "../images/pin.png";
import cross from "../images/cross.png";
import power from "../images/power.png";
import parallel from "../images/parallel.png";
import { Tile } from "../components";
import { tileSet } from "../tiles";

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
}

export class TileComponent extends React.Component<TileProps> {
  render() {
    const tile = tileSet.namedTiles.get(this.props.tile);
    if (tile == null) {
      return <div>unknown tile ({this.props.tile})</div>;
    } else {
      const imageUrl = tileImages[tile.name];
      const style: { [key: string]: string } = {
        transform: `rotate(${90 * tile.rotate}deg)`,
      };
      return <img src={imageUrl} style={style} alt={tile.name} />;
    }
  }
}
