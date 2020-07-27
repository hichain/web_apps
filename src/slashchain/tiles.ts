import square from "./images/square.png";
import arrow from "./images/arrow.png";
import pin from "./images/pin.png";
import cross from "./images/cross.png";
import power from "./images/power.png";
import parallel from "./images/parallel.png";
import { TileData, Tile, NamedTile } from "./components";

const tileData: TileData[] = [
  {
    name: "square",
    lines: 0x99,
    image: square,
  },
  {
    name: "arrow",
    lines: 0x96,
    image: arrow,
  },
  {
    name: "pin",
    lines: 0xa9,
    image: pin,
  },
  {
    name: "cross",
    lines: 0x66,
    image: cross,
  },
  {
    name: "power",
    lines: 0x56,
    image: power,
  },
  {
    name: "parallel",
    lines: 0xaa,
    image: parallel,
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
            { name: tile.name, rotate: i, image: tile.image },
          ]),
      ];
    }, []);
    this.tiles = tiles;
    this.namedTiles = new Map(namedTiles);
  }
}

export const tileSet = new NamedTileSet(tileData);
