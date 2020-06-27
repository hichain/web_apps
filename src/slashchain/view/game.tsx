import { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Board } from "../board";
import { HandsSet } from "../rules";
import { TileCell } from "../components";
import { GameState } from "./game_state";

export const Slashchain: Game<GameState> = {
  name: "slashchain",
  setup: (ctx): GameState => {
    const handsSet = new HandsSet().rules.basic_3x
    const hands = ctx.playOrder.reduce((obj, player) => ({
      ...obj,
      [player]: handsSet.hands.clone()
    }), {})
    return {
      ruleName: handsSet.name,
      board: new Board(),
      hands: hands,
    };
  },
  turn: {
    moveLimit: 1,
  },
  moves: {
    clickCell: (G, ctx, cell?: TileCell) => {
      const pickedTile = G.pickedTile;
      if (!(cell && cell.isEmpty() && pickedTile)) {
        return INVALID_MOVE;
      }
      G.board.put(cell, pickedTile);
      G.pickedTile = undefined;
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
