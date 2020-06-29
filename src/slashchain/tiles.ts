import { Tile, Line } from "./components";
import basicTilesJson from "./tiles.json";

export class TileRepository {
  private parseLines = (name: string, rawLines: string): Tile => {
    const tile = this.parseBitMask(parseInt(rawLines, 16));
    const lines = this.chunk(tile, 2).map(
      (line): Line => ({
        slash: line[0],
        backslash: line[1],
      })
    );

    return new Tile(
      lines[0],
      lines[1],
      lines[2],
      lines[3],
      name,
    );
  };

  private parseBitMask = (bits: number): boolean[] => {
    if (bits === 0) {
      return [];
    }
    return [...this.parseBitMask(bits >>> 1), !!(bits & 1)];
  };

  private chunk = <T extends any[]>(array: T, size: number): T[] => {
    return array.reduce(
      (newarr, _, i) =>
        i % size ? newarr : [...newarr, array.slice(i, i + size)],
      []
    );
  };

  private parseTiles = (tiles: { [key: string]: string }): Tile[] => {
    return Object.keys(tiles).map((name) => this.parseLines(name, tiles[name]));
  };

  basicTiles: Tile[] = this.parseTiles(basicTilesJson);
}
