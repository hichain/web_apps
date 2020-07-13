import { LineCell, TileCell, NamedTile } from "./components";

export class Board {
  tileCells: ReadonlyArray<TileCell> = [new TileCell(0, 0)];
  private lineCells: ReadonlyArray<LineCell> = [];

  put(cell: TileCell, tile: NamedTile) {
    cell.tile = tile;
    this.applyLines(cell.x, cell.y, tile);
    this.addAdjacentCells(cell);
  }

  private applyLines(x: number, y: number, tile: NamedTile) {
    const newLineCells = [
      new LineCell(0, 0, tile.upperLeft),
      new LineCell(0, 1, tile.upperRight),
      new LineCell(1, 0, tile.lowerLeft),
      new LineCell(1, 1, tile.lowerRight),
    ].map((cell) => new LineCell(cell.x + x * 2, cell.y + y * 2, cell));
    this.lineCells = this.lineCells.concat(newLineCells);
  }

  private addAdjacentCells(cell: TileCell) {
    const newCells = [
      new TileCell(cell.x, cell.y - 1),
      new TileCell(cell.x + 1, cell.y),
      new TileCell(cell.x, cell.y + 1),
      new TileCell(cell.x - 1, cell.y),
    ].filter(
      (newCell) =>
        !this.tileCells.some((cell) => TileCell.equals(cell, newCell))
    );
    this.tileCells = this.tileCells.concat(newCells);
  }
}
