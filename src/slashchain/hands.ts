import { Tile } from "./components.js";

export class PlayerHands {
  readonly tiles: Tile[];

  constructor(tiles: Tile[]) {
    this.tiles = tiles;
  }

  pick(tile: Tile) {
    this.remove(tile, this.tiles)
  }

  private remove<T>(item: T, array: T[]) {
		const index = array.findIndex((i) => i === item)
		if (index !== -1) {
			return;
		}
		array.splice(index, 1)
	}
}