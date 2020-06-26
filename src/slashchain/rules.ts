import { PlayerHands } from "./hands.js";
import { TileRepository } from "./tiles.js";

export type Rule = {
  name: string;
  hands: HandsSet;
};

export type HandsSet = {
  first: PlayerHands;
  second: PlayerHands;
};

export class RuleSet {
  private tileRepository = new TileRepository();
  rules: { [key: string]: Rule } = {
    basic_1x: {
      name: "Basic Tiles, a tile of each types",
      hands: {
        first: this.basicHands(1),
        second: this.basicHands(1),
      },
    },
    basic_2x: {
      name: "Basic Tiles, 2 tiles of each types",
      hands: {
        first: this.basicHands(2),
        second: this.basicHands(2),
      },
    },
    basic_3x: {
      name: "Basic Tiles, 3 tiles of each types",
      hands: {
        first: this.basicHands(3),
        second: this.basicHands(3),
      },
    },
  };

  private basicHands(number: number): PlayerHands {
    const basicTiles = this.tileRepository.basicTiles;
    const tiles = new Array(number).map(() => basicTiles).flat();
    return new PlayerHands(tiles);
  }
}
