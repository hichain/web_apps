import { Cell, CellSet, InfiniteBoard } from "../common/infinite_board";
import { Tile, TileCell } from "./tile";

export class TileBoard extends InfiniteBoard<Tile> {
  constructor(tileCells: TileCell[]) {
    super(tileCells.map((i): [Cell, Tile] => [{ x: i.x, y: i.y }, i.tile]));
  }

  legalCells(): CellSet {
    const legalCells = this.adjucentCells();
    if (legalCells.size === 0) {
      legalCells.add({ x: 0, y: 0 });
    }
    return legalCells;
  }
}
