import { Tile } from "./components";

export class PlayerHands {
  readonly tiles: Tile[];
  pickedTile?: Tile;

  constructor(tiles: Tile[]) {
    this.tiles = tiles;
  }

  pick(tile: Tile) {
    const index = this.tiles.findIndex((tile) => tile === this.pickedTile);
    if (index === -1) {
      return;
    }
		this.tiles.splice(index, 1);
		this.pickedTile = undefined
  }

  clone() {
    return new PlayerHands([...this.tiles]);
  }
}
