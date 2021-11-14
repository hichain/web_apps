import _ from "lodash";
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

const allLines: Record<RotatedTile, Tile> = {
  square: 153,
  arrowUpwards: 150,
  arrowRightwards: 90,
  arrowDownwards: 105,
  arrowLeftwards: 165,
  pinUpperLeft: 166,
  pinUpperRight: 86,
  pinLowerRight: 106,
  pinLowerLeft: 101,
  cross: 102,
  powerUpperLeft: 89,
  powerUpperRight: 169,
  powerLowerRight: 149,
  powerLowerLeft: 154,
  parallelSlash: 170,
  parallelBackslash: 85,
};

export const toTile = (rotatedTile: RotatedTile): Tile => allLines[rotatedTile];

const rotatedTileMap: Record<Tile, RotatedTile> = Object.entries(
  allLines
).reduce((acc, [rotatedTile, tile]) => ({ ...acc, [tile]: rotatedTile }), {});

export const toRotatedTile = (tile: Tile): RotatedTile => rotatedTileMap[tile];

export const defaultRotatedTiles = {
  square: "square",
  arrow: "arrowUpwards",
  pin: "pinUpperLeft",
  cross: "cross",
  power: "powerUpperLeft",
  parallel: "parallelSlash",
} as const;

export type DefaultRotatedTile =
  typeof defaultRotatedTiles[keyof typeof defaultRotatedTiles];

// right-handed
const rightSideTiles: Record<RotatedTile, RotatedTile> = {
  square: "square",
  arrowUpwards: "arrowRightwards",
  arrowRightwards: "arrowDownwards",
  arrowDownwards: "arrowLeftwards",
  arrowLeftwards: "arrowUpwards",
  pinUpperLeft: "pinUpperRight",
  pinUpperRight: "pinLowerRight",
  pinLowerRight: "pinLowerLeft",
  pinLowerLeft: "pinUpperLeft",
  cross: "cross",
  powerUpperLeft: "powerUpperRight",
  powerUpperRight: "powerLowerRight",
  powerLowerRight: "powerLowerLeft",
  powerLowerLeft: "powerUpperLeft",
  parallelSlash: "parallelBackslash",
  parallelBackslash: "parallelSlash",
};

const getAngleRecursively = (
  tile: RotatedTile,
  deps: number
): { tile: DefaultRotatedTile; angle: number } => {
  if (deps === 4) {
    throw new Error(`The angle of tile "${tile}" is not found.`);
  }
  if (Object.values<RotatedTile>(defaultRotatedTiles).includes(tile)) {
    return { tile: tile as DefaultRotatedTile, angle: 4 - deps };
  }
  return getAngleRecursively(rightSideTiles[tile], deps + 1);
};

export const getAngle = (tile: RotatedTile) => getAngleRecursively(tile, 0);
