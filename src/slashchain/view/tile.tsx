import React from "react";
import { Tile } from "../components";
import { tileSet } from "../tiles";

export interface TileProps {
  tile: Tile;
}

export class TileComponent extends React.Component<TileProps> {
  render() {
    const tile = tileSet.namedTiles.get(this.props.tile);
    if (tile == null) {
      return <div>unknown tile ({this.props.tile})</div>;
    } else {
      const style: { [key: string]: string } = {
        transform: `rotate(${90 * tile.rotate}deg)`,
      };
      return <img src={tile.image} style={style} alt={tile.name} />;
    }
  }
}
