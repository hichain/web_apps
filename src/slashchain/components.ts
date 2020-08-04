export interface Cell {
  x: number;
  y: number;
}

export type Tile = number;

export type TileCell = Cell & {
  tile: Tile;
};

const isSame = (e1: Cell, e2: Cell): boolean => {
  return e1.x === e2.x && e1.y === e2.y;
};

class CellSet extends Set<Cell> {
  has(value: Cell): boolean {
    this.forEach((cell) => {
      if (isSame(value, cell)) {
        return true;
      }
    });
    return false;
  }

  add(value: Cell): this {
    return this.has(value) ? this : super.add(value);
  }

  delete(value: Cell): boolean {
    this.forEach((cell) => {
      if (isSame(value, cell)) {
        return super.delete(cell);
      }
    });
    return false;
  }

  range(): BoardRange {
    const xArray = Array.from(this).map((cell) => cell.x);
    const yArray = Array.from(this).map((cell) => cell.y);
    xArray.sort((a, b) => a - b);
    yArray.sort((a, b) => a - b);
    return {
      minX: xArray[0],
      maxX: xArray[xArray.length - 1],
      minY: yArray[0],
      maxY: yArray[yArray.length - 1],
    };
  }
}

class InfiniteBoard<V> extends Map<Cell, V> {
  get(key: Cell): V | undefined {
    this.forEach((value, cell) => {
      if (isSame(key, cell)) {
        return value;
      }
    });
    return undefined;
  }

  has(key: Cell): boolean {
    this.forEach((_, cell) => {
      if (isSame(key, cell)) {
        return true;
      }
    });
    return false;
  }

  set(key: Cell, value: V): this {
    return this.has(key) ? this : super.set(key, value);
  }

  delete(key: Cell): boolean {
    this.forEach((_, cell) => {
      if (isSame(key, cell)) {
        return super.delete(cell);
      }
    });
    return false;
  }
}

export type BoardRange = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export class TileBoard extends InfiniteBoard<Tile> {
  constructor(tileCells: TileCell[]) {
    super(tileCells.map((i): [Cell, Tile] => [{ x: i.x, y: i.y }, i.tile]));
  }

  getTileCell(key: Cell): TileCell | undefined {
    const tile = this.get(key);
    if (tile === undefined) {
      return undefined;
    }
    return { ...key, tile };
  }

  legalMoves(): CellSet {
    const legalCells = new CellSet();
    const adjucentCells = (cell: Cell) => [
      { x: cell.x, y: cell.y - 1 },
      { x: cell.x - 1, y: cell.y },
      { x: cell.x, y: cell.y + 1 },
      { x: cell.x + 1, y: cell.y },
    ];
    let iterator = this.keys();
    let result = iterator.next();
    while (!result.done) {
      adjucentCells(result.value).forEach((cell) => legalCells.add(cell));
      result = iterator.next();
    }
    iterator = this.keys();
    result = iterator.next();
    while (!result.done) {
      legalCells.delete(result.value);
      result = iterator.next();
    }
    if (legalCells.size === 0) {
      legalCells.add({ x: 0, y: 0 });
    }
    return legalCells;
  }
}

export interface TileData {
  name: string;
  lines: number;
}

export interface NamedTile {
  name: string;
  rotate: number;
}
