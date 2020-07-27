import { tileSet } from "./tiles";
import { Tile } from "./components";

export type Rule = {
  name: string;
  tileType: TileType;
  hands: Tile[];
};

export type TileType = "basic";

export interface RuleSet {
  current: Rule;
  rules: Rule[];
}

const times = <T>(array: T[], n: number): T[] => {
  return new Array(n).fill(null).reduce((acc) => [...acc, ...array], []);
};

export const buildRule = (
  name: string,
  tileType: TileType,
  tileNumber: number
): Rule => {
  const tiles = (): Tile[] => {
    if (tileType === "basic") {
      return tileSet.tiles.map((tile) => tile.lines);
    } else {
      const _exhaustiveCheck: never = tileType;
      return _exhaustiveCheck;
    }
  };
  const hands = times(tiles(), tileNumber);
  return {
    name,
    tileType,
    hands,
  };
};
