import { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { PlayerHands } from "../hands";
import { Board } from "../board.js";
import { HandsSet } from "../rules.js";

export type GameState = {
  ruleName: string;
  board: Board;
  hands: { [key: string]: PlayerHands };
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
    clickCell: (G, ctx, id) => {
      // TODO: define moves
      return INVALID_MOVE;
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
