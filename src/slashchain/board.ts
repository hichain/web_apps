import { LineCell, TileCell, Tile } from "./components";

export class Board {
  tileCells: ReadonlyArray<TileCell> = [new TileCell(0, 0)];
  private lineCells: ReadonlyArray<LineCell> = [];

  put(cell: TileCell, tile: Tile) {
    cell.tile = tile;
    this.applyLines(cell.x, cell.y, tile);
    this.addAdjacentCells(cell);
  }

  private applyLines(x: number, y: number, tile: Tile) {
    const newLineCells = tile
      .innerCells()
      .map((cell) => new LineCell(cell.x + x * 2, cell.y + y * 2, cell));
    this.lineCells = this.lineCells.concat(newLineCells);
  }

  private addAdjacentCells(cell: TileCell) {
    const newCells = cell
      .adjacentCells()
      .filter(
        (newCell) =>
          !this.tileCells.some((cell) => newCell.equals(cell.x, cell.y))
      );
    this.tileCells = this.tileCells.concat(newCells);
  }
}
