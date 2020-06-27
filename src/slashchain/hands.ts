import { Tile } from "./components";

export class PlayerHands {
  readonly tiles: Tile[];

  constructor(tiles: Tile[]) {
    this.tiles = tiles;
  }

  pick(tile: Tile) {
    const index = this.tiles.findIndex((item) => item === tile);
    if (index === -1) {
      return;
    }
		this.tiles.splice(index, 1);
  }

  clone() {
    return new PlayerHands(this.tiles.map(tile => tile.clone()));
  }
}
