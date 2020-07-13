export interface Cell {
  x: number;
  y: number;
}

export interface Line {
  slash: boolean;
  backslash: boolean;
}

export class LineCell implements Line, Cell {
  slash: boolean;
  backslash: boolean;
  x: number;
  y: number;

  constructor(x: number, y: number, line?: Line) {
    this.x = x;
    this.y = y;
    this.slash = line?.slash || false;
    this.backslash = line?.backslash || false;
  }
}

export interface Tile {
  upperLeft: Line;
  upperRight: Line;
  lowerLeft: Line;
  lowerRight: Line;
}

const rotateTile = (tile: Tile, number: number): Tile => {
  if (number % 4 === 0) {
    return tile;
  } else if (number % 4 > 0) {
    return rotateTile(
      {
        upperLeft: tile.lowerLeft,
        upperRight: tile.lowerRight,
        lowerLeft: tile.upperRight,
        lowerRight: tile.upperLeft,
      },
      (number % 4) - 1
    );
  } else {
    return rotateTile(
      {
        upperLeft: tile.upperRight,
        upperRight: tile.upperLeft,
        lowerLeft: tile.lowerLeft,
        lowerRight: tile.lowerRight,
      },
      (number % 4) + 1
    );
  }
};

export class NamedTile implements Tile {
  readonly name: string;
  readonly rotateCount: number;
  readonly upperLeft: Line;
  readonly upperRight: Line;
  readonly lowerLeft: Line;
  readonly lowerRight: Line;

  constructor(name: string, tile: Tile, rotateCount: number = 0) {
    this.name = name;
    const rotatedTile = rotateTile(tile, rotateCount);
    this.rotateCount = rotateCount % 4;
    this.upperLeft = rotatedTile.upperLeft;
    this.upperRight = rotatedTile.upperRight;
    this.lowerLeft = rotatedTile.lowerLeft;
    this.lowerRight = rotatedTile.lowerRight;
  }
}

export class TileCell implements Cell {
  x: number;
  y: number;
  tile?: NamedTile;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static equals = (cell1: Cell, cell2: Cell): boolean => {
    return cell1.x === cell2.x && cell1.y === cell2.y;
  };
}
