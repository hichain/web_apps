import { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Board } from "./board";
import { buildRule, RuleSet } from "./rules";
import { TileCell, Tile } from "./components";
import { PlayerHands } from "./hands";

export type GameState = {
  ruleSet: RuleSet;
  board: Board;
  hands: { [key: string]: PlayerHands };
};

export const Slashchain: Game<GameState> = {
  name: "slashchain",
  setup: (ctx): GameState => {
    const rules = new Array(3)
      .fill(null)
      .map((_, i) => ++i)
      .map((i) =>
        buildRule(`Basic Tiles, ${i} tile of each types`, "basic", i)
      );
    const ruleSet: RuleSet = {
      current: rules[2],
      rules,
    };
    const hands = ctx.playOrder.reduce(
      (obj, player) => ({
        ...obj,
        [player]: () => ruleSet.current.hands.clone(),
      }),
      {}
    );
    return {
      ruleSet,
      board: new Board(),
      hands: hands,
    };
  },
  turn: {
    moveLimit: 1,
  },
  moves: {
    clickCell: (G, ctx, cell?: TileCell, tile?: Tile) => {
      const myPlayerID = ctx.playerID;
      if (myPlayerID === undefined) {
        return INVALID_MOVE;
      }
      if (!(cell && !cell.tile && tile)) {
        return INVALID_MOVE;
      }
      G.board.put(cell, tile);
      G.hands[myPlayerID].pick(tile);
    },
  },
  endIf: (G, ctx) => {
    // TODO: define victory conditions
    const noHands = Object.keys(G.hands).every((player) => () =>
      G.hands[player].tiles.length === 0
    );
    if (noHands) {
      return { draw: true };
    }
  },
};
