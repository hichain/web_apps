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

export class CellSet extends Set<Cell> {
  has(value: Cell): boolean {
    return this.keyArray().some((cell) => isSame(value, cell));
  }

  add(value: Cell): this {
    return this.has(value) ? this : super.add(value);
  }

  delete(value: Cell): boolean {
    const foundCell = this.keyArray().find((cell) => isSame(value, cell));
    if (foundCell == null) {
      return false;
    }
    return super.delete(foundCell);
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

  keyArray(): Cell[] {
    return Array.from(this);
  }
}

class InfiniteBoard<V> extends Map<Cell, V> {
  get(key: Cell): V | undefined {
    return this.entriesArray().find((value) => isSame(key, value[0]))?.[1];
  }

  has(key: Cell): boolean {
    return this.entriesArray().some((value) => isSame(key, value[0]));
  }

  set(key: Cell, value: V): this {
    return this.has(key) ? this : super.set(key, value);
  }

  delete(key: Cell): boolean {
    const foundKey = this.entriesArray().find((value) =>
      isSame(key, value[0])
    )?.[0];
    if (foundKey == null) {
      return false;
    }
    return super.delete(foundKey);
  }

  entriesArray(): [Cell, V][] {
    return Array.from(this.entries());
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
