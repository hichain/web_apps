import { basicTiles } from "./tiles";
import { NamedTile } from "./components";

export type Rule = {
  name: string;
  tileType: TileType;
  hands: NamedTile[];
};

export type TileType = "basic";

export interface RuleSet {
  current: Rule;
  rules: Rule[];
}

const increase = (tiles: NamedTile[], number: number): NamedTile[] => {
  return new Array(number).fill(null).reduce((acc) => [...acc, ...tiles], []);
};

export const buildRule = (
  name: string,
  tileType: TileType,
  tileNumber: number
): Rule => {
  const tiles = (): NamedTile[] => {
    if (tileType === "basic") {
      return basicTiles.map((i) => new NamedTile(i.name, i));
    } else {
      const _exhaustiveCheck: never = tileType;
      return _exhaustiveCheck;
    }
  };
  const hands = increase(tiles(), tileNumber);
  return {
    name,
    tileType,
    hands,
  };
};
