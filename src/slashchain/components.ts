import { Cell, CellSet, InfiniteBoard } from "./infinite_board";

export type Tile = number;

export type TileCell = Cell & {
  tile: Tile;
};

export class TileBoard extends InfiniteBoard<Tile> {
  constructor(tileCells: TileCell[]) {
    super(tileCells.map((i): [Cell, Tile] => [{ x: i.x, y: i.y }, i.tile]));
  }

  legalCells(): CellSet {
    const legalCells = this.adjucentCells()
    if (legalCells.size === 0) {
      legalCells.add({ x: 0, y: 0 });
    }
    return legalCells;
  }
}

export interface TileData {
  name: string;
  lines: Tile;
}

export interface NamedTile {
  name: string;
  dir: number;
}
