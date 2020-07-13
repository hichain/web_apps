import { PlayerHands } from "./hands";
import { basicTiles } from "./tiles";
import { Tile } from "./components.js";

export type Rule = {
  name: string;
  tileType: TileType;
  hands: PlayerHands;
};

export type TileType = "basic";

export interface RuleSet {
  current: Rule;
  rules: Rule[];
}

const increase = (tiles: Tile[], number: number): Tile[] => {
  return new Array(number).fill(null).reduce((acc) => [...acc, tiles], []);
};

export const buildRule = (
  name: string,
  tileType: TileType,
  tileNumber: number
): Rule => {
  const tiles = (): Tile[] => {
    if (tileType === "basic") {
      return basicTiles.map((i) => i.clone());
    } else {
      const _exhaustiveCheck: never = tileType;
      return _exhaustiveCheck;
    }
  };
  const hands = new PlayerHands(increase(tiles(), tileNumber));
  return {
    name,
    tileType,
    hands,
  };
};
