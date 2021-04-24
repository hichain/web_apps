export interface Cell {
  x: number;
  y: number;
}

export type BoardRange = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export const equals = (e1: Cell, e2?: Cell): boolean => {
  return e1.x === e2?.x && e1.y === e2?.y;
};

export const offset = (
  range: BoardRange,
  offset: { top: number; right: number; bottom: number; left: number }
): BoardRange => {
  return {
    minX: range.minX - offset.left,
    maxX: range.maxX + offset.right,
    minY: range.minY - offset.top,
    maxY: range.maxY + offset.bottom,
  };
};

export class CellArray extends Array<Cell> {
  static fromRange(range: BoardRange): CellArray {
    const array = new CellArray();
    for (let y = range.minY; y <= range.maxY; y++) {
      for (let x = range.minX; x <= range.maxX; x++) {
        array.push({ x, y });
      }
    }
    return array;
  }

  range(): BoardRange {
    const xArray = this.map((cell) => cell.x);
    const yArray = this.map((cell) => cell.y);
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

export class CellSet extends Set<Cell> {
  has(value: Cell): boolean {
    return this.toArray().some((cell) => equals(value, cell));
  }

  add(value: Cell): this {
    return this.has(value) ? this : super.add(value);
  }

  delete(value: Cell): boolean {
    const foundCell = this.toArray().find((cell) => equals(value, cell));
    if (foundCell == null) {
      return false;
    }
    return super.delete(foundCell);
  }

  toArray(): CellArray {
    return new CellArray(...this);
  }
}

export class InfiniteBoard<V> extends Map<Cell, V> {
  get(key: Cell): V | undefined {
    return this.entriesArray().find((value) => equals(key, value[0]))?.[1];
  }

  has(key: Cell): boolean {
    return this.entriesArray().some((value) => equals(key, value[0]));
  }

  set(key: Cell, value: V): this {
    return this.has(key) ? this : super.set(key, value);
  }

  delete(key: Cell): boolean {
    const foundKey = this.entriesArray().find((value) =>
      equals(key, value[0])
    )?.[0];
    if (foundKey == null) {
      return false;
    }
    return super.delete(foundKey);
  }

  adjucentCells(): CellSet {
    const adjucent = (cell: Cell): Cell[] => [
      { x: cell.x, y: cell.y - 1 },
      { x: cell.x - 1, y: cell.y },
      { x: cell.x, y: cell.y + 1 },
      { x: cell.x + 1, y: cell.y },
    ];
    const cells = Array.from(this.keys())
      .reduce((array: Cell[], cell) => [...array, ...adjucent(cell)], [])
      .filter((cell) => !this.has(cell));
    return new CellSet(cells);
  }

  entriesArray(): [Cell, V][] {
    return Array.from(this.entries());
  }
}
