import { HandsBuilder, HandTiles } from "./hands";

export type Rule = {
  name: string;
  hands: HandTiles;
};

const handsBuilder = new HandsBuilder(3, 3);

export const ruleSet: Record<string, Rule> = {
  basic3: {
    name: "Basic Tiles, 3 tiles of each type",
    hands: handsBuilder.buildTiles(),
  },
};
