import { Tile } from "./components";

export class PlayerHands {
  readonly tiles: Tile[];

  constructor(tiles: Tile[]) {
    this.tiles = tiles;
  }

  pick(i: number) {
    this.tiles.splice(i, 1);
  }
}