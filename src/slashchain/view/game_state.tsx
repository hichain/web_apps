import { Board } from "../board.js";
import { PlayerHands } from "../hands.js";
import { Tile } from "../components.js";

export type GameState = {
  ruleName: string;
  board: Board;
  hands: { [key: string]: PlayerHands };
  pickedTile?: Tile;
};
