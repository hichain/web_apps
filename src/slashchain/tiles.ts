import { NamedTile, Line, Tile } from "./components";
import basicTilesJson from "./tiles.json";

class TileParser {
  private parseLines = (name: string, rawLines: string): NamedTile => {
    const bits = this.parseBitMask(parseInt(rawLines, 16));
    const lines = this.chunk(bits, 2).map(
      (line): Line => ({
        slash: line[0],
        backslash: line[1],
      })
    );
    const tile: Tile = {
      upperLeft: lines[0],
      upperRight: lines[1],
      lowerLeft: lines[2],
      lowerRight: lines[3],
    };
    return new NamedTile(name, tile);
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

  parse = (tiles: { [key: string]: string }): NamedTile[] => {
    return Object.keys(tiles).map((name) => this.parseLines(name, tiles[name]));
  };
}

const parser = new TileParser();
export const basicTiles = parser.parse(basicTilesJson);
