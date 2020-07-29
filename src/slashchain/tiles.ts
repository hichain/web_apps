import { TileData, Tile, NamedTile } from "./components";

const tileData: TileData[] = [
  {
    name: "square",
    lines: 0x99,
  },
  {
    name: "arrow",
    lines: 0x96,
  },
  {
    name: "pin",
    lines: 0xa9,
  },
  {
    name: "cross",
    lines: 0x66,
  },
  {
    name: "power",
    lines: 0x56,
  },
  {
    name: "parallel",
    lines: 0xaa,
  },
];

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

class NamedTileSet {
  tiles: TileData[];
  namedTiles: ReadonlyMap<Tile, NamedTile>;

  constructor(tiles: TileData[]) {
    const namedTiles = tiles.reduce((acc: [Tile, NamedTile][], tile) => {
      return [
        ...acc,
        ...new Array(4)
          .fill(null)
          .map((_, i): [Tile, NamedTile] => [
            rotate(tile.lines, i),
            { name: tile.name, rotate: i },
          ]),
      ];
    }, []);
    this.tiles = tiles;
    this.namedTiles = new Map(namedTiles);
  }
}

export const tileSet = new NamedTileSet(tileData);
