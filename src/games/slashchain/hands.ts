import { NamedPlayer } from "./player";
import { Tile, defaultRotatedTiles, namedTiles, toTile } from "./tile";

export type HandTiles = Record<NamedPlayer, Tile[]>;

const times = <T>(item: T, n: number): T[] => {
  return new Array(n).fill(null).reduce((acc) => [...acc, item], []);
};

export class HandsBuilder {
  readonly slash: number;
  readonly backslash: number;

  constructor(slash: number, backslash: number) {
    this.slash = slash;
    this.backslash = backslash;
  }

  buildTiles(): HandTiles {
    return {
      slash: Object.values(namedTiles).flatMap((namedTile) =>
        times(toTile(defaultRotatedTiles[namedTile]), this.slash)
      ),
      backslash: Object.values(namedTiles).flatMap((namedTile) =>
        times(toTile(defaultRotatedTiles[namedTile]), this.backslash)
      ),
    };
  }
}
