import { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { PlayerHands } from "../hands";
import { Board } from "../board.js";
import { HandsSet } from "../rules.js";
import { Tile, TileCell } from "../components.js";

export type GameState = {
  ruleName: string;
  board: Board;
  hands: { [key: string]: PlayerHands };
  pickedTile?: Tile;
};

const handsSet = new HandsSet();

export const Slashchain: Game<GameState> = {
  name: "slashchain",
  setup: (): GameState => ({
    ruleName: handsSet.rules.basic_3x.name,
    board: new Board(),
    hands: {
      first: handsSet.rules.basic_3x.hands,
      second: handsSet.rules.basic_3x.hands,
    },
  }),
  turn: {
    moveLimit: 1,
  },
  moves: {
    clickCell: (G, ctx, cell?: TileCell) => {
      if (!cell || !cell.isEmpty()) {
        return INVALID_MOVE;
      }
      // TODO: put the tile on board
    },
  },
  endIf: (G, ctx) => {
    // TODO: define victory conditions
    const noHands = Object.keys(G.hands).every(
      (player) => G.hands[player].tiles.length === 0
    );
    if (noHands) {
      return { draw: true };
    }
  },
};
