import { Cell } from "../common";

export type Tile = number;

export type TileCell = Cell & {
  tile: Tile;
};

export const rotate = (tile: Tile, dir: number): Tile => {
  if (dir % 4 === 0) {
    return tile;
  } else if (dir > 0) {
    return rotate(
      ((tile & 0xa8) >>> 3) |
        ((tile & 0x54) >>> 1) |
        ((tile & 0x2) << 5) |
        ((tile & 0x1) << 7),
      dir - 1
    );
  } else {
    return rotate(
      ((tile & 0x2a) << 1) |
        ((tile & 0x15) << 3) |
        ((tile & 0x80) >>> 7) |
        ((tile & 0x40) >>> 5),
      dir + 1
    );
  }
};

export const namedTiles = {
  square: "square",
  arrow: "arrow",
  pin: "pin",
  cross: "cross",
  power: "power",
  parallel: "parallel",
} as const;

export type NamedTile = typeof namedTiles[keyof typeof namedTiles];

export const defaultTiles: Record<NamedTile, Tile> = {
  square: 153,
  arrow: 150,
  pin: 166,
  cross: 102,
  power: 89,
  parallel: 170,
};

export const rotatedTiles = {
  square: "square",
  arrowUpwards: "arrowUpwards",
  arrowRightwards: "arrowRightwards",
  arrowDownwards: "arrowDownwards",
  arrowLeftwards: "arrowLeftwards",
  pinUpperLeft: "pinUpperLeft",
  pinUpperRight: "pinUpperRight",
  pinLowerRight: "pinLowerRight",
  pinLowerLeft: "pinLowerLeft",
  cross: "cross",
  powerUpperLeft: "powerUpperLeft",
  powerUpperRight: "powerUpperRight",
  powerLowerRight: "powerLowerRight",
  powerLowerLeft: "powerLowerLeft",
  parallelSlash: "parallelSlash",
  parallelBackslash: "parallelBackslash",
} as const;

export type RotatedTile = typeof rotatedTiles[keyof typeof rotatedTiles];

const lines: Record<Tile, RotatedTile> = {
  153: "square",
  150: "arrowUpwards",
  90: "arrowRightwards",
  105: "arrowDownwards",
  165: "arrowLeftwards",
  166: "pinUpperLeft",
  86: "pinUpperRight",
  106: "pinLowerRight",
  101: "pinLowerLeft",
  102: "cross",
  89: "powerUpperLeft",
  169: "powerUpperRight",
  149: "powerLowerRight",
  154: "powerLowerLeft",
  170: "parallelSlash",
  85: "parallelBackslash",
};

export const toRotatedTile = (tile: Tile): RotatedTile => lines[tile];
