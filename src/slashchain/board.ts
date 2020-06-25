import { LineCell, TileCell, Tile } from "./components";

export class Board {
  tileCells: ReadonlyArray<TileCell> = [new TileCell(0, 0)];
  private lineCells: ReadonlyArray<LineCell> = [];

  put(cell: TileCell, tile: Tile) {
    cell.tile = tile;
    this.applyLines(cell);
    this.addAdjacentCells(cell);
  }

  private applyLines(tileCell: TileCell) {
    const newLineCells = tileCell.tile
      .innerCells()
      .map(
        (cell) =>
          new LineCell(cell.x + tileCell.x * 2, cell.y + tileCell.y * 2, cell)
      );
    this.lineCells = this.lineCells.concat(newLineCells);
  }

  private addAdjacentCells(cell: TileCell) {
    const newCells = cell
      .adjacentCells()
      .filter(
        (newCell) => !this.tileCells.some((cell) => newCell.equals(cell))
      );
    this.tileCells = this.tileCells.concat(newCells);
  }
}
