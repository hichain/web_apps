import React from "react";
import square from "../images/square.png";
import arrow from "../images/arrow.png";
import pin from "../images/pin.png";
import cross from "../images/cross.png";
import power from "../images/power.png";
import parallel from "../images/parallel.png";
import { Tile } from "../components.js";

const images: { [key: string]: string } = {
  square,
  arrow,
  pin,
  cross,
  power,
  parallel,
};

export interface TileProps {
	tile: Tile
}

export class TileComponent extends React.Component<TileProps> {
  render() {
    const tile = this.props.tile;
    const image = images[tile.name];
    const style: { [key: string]: string } = {
      transform: `rotate(${90 * tile.rotateCount}deg)`,
    };
    if (image == null) {
      return (
				<div style={style}>
          {tile.name}
        </div>
      );
    } else {
      return (
        <img
          src={image}
          style={style}
          alt={tile.name}
        />
      );
    }
  }
}
