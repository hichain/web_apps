import { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Board } from "../board";
import { HandsSet } from "../rules";
import { TileCell } from "../components";
import { GameState } from "./game_state";

const handsSet = new HandsSet();

export const Slashchain: Game<GameState> = {
  name: "slashchain",
  setup: (ctx): GameState => {
    const firstPlayer = ctx.currentPlayer
    const secondPlayer = ctx.playOrder.find(player => player !== firstPlayer)!!
    return {
      ruleName: handsSet.rules.basic_3x.name,
      board: new Board(),
      hands: {
        [firstPlayer]: handsSet.rules.basic_3x.hands,
        [secondPlayer]: handsSet.rules.basic_3x.hands
      },
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
      G.hands[ctx.currentPlayer].pick(pickedTile);
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
