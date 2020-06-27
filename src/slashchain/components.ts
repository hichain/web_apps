export class Cell {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(cell: Cell): Boolean {
    return this.x === cell.x && this.y === cell.y;
  }
}

interface Line {
  slash: boolean;
  backslash: boolean;
}

export type { Line };

export class LineCell extends Cell implements Line {
  slash: boolean;
  backslash: boolean;

  constructor(x: number, y: number, line?: Line) {
    super(x, y);
    this.slash = line?.slash || false;
    this.backslash = line?.backslash || false;
  }
}

export class Tile {
  readonly name?: string;
  readonly imageUrl?: string;
  private readonly upperLeft: Line;
  private readonly upperRight: Line;
  private readonly lowerLeft: Line;
  private readonly lowerRight: Line;

  constructor(
    upperLeft: Line,
    upperRight: Line,
    lowerLeft: Line,
    lowerRight: Line,
    name?: string,
    imageUrl?: string
  ) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.upperLeft = upperLeft;
    this.upperRight = upperRight;
    this.lowerLeft = lowerLeft;
    this.lowerRight = lowerRight;
  }

  innerCells() {
    return [
      new LineCell(0, 0, this.upperLeft),
      new LineCell(0, 1, this.upperRight),
      new LineCell(1, 0, this.lowerLeft),
      new LineCell(1, 1, this.lowerRight),
    ];
  }
}

const emptyLine: Line = {
  slash: false,
  backslash: false,
};
const emptyTile: Tile = new Tile(emptyLine, emptyLine, emptyLine, emptyLine);

export class TileCell extends Cell {
  tile: Tile = emptyTile;

  isEmpty(): boolean {
    return this.tile === emptyTile;
  }

  adjacentCells(): Array<TileCell> {
    return [
      new TileCell(this.x, this.y - 1),
      new TileCell(this.x + 1, this.y),
      new TileCell(this.x, this.y + 1),
      new TileCell(this.x - 1, this.y),
    ];
  }
}
