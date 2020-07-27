import { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { buildRule, RuleSet } from "./rules";
import { TileBoard, TileCell, Tile } from "./components";

export type GameState = {
  ruleSet: RuleSet;
  board: TileCell[];
  hands: { [key: string]: Tile[] };
};

export type Moves = {
  clickCell: (x: number, y: number, tile: Tile) => void;
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
        [player]: [...ruleSet.current.hands],
      }),
      {}
    );
    return {
      ruleSet,
      board: [],
      hands,
    };
  },
  turn: {
    moveLimit: 1,
  },
  moves: {
    clickCell: (G, ctx, x: number, y: number, tile: Tile) => {
      const myPlayerID = ctx.playerID;
      if (myPlayerID == null) {
        return INVALID_MOVE;
      }
      const board = new TileBoard(G.board);
      const cell = { x, y, tile };
      if (board.has(cell)) {
        return INVALID_MOVE;
      }
      G.board = [...G.board, cell];
      const hands = G.hands[myPlayerID];
      G.hands[myPlayerID] = hands.filter((i) => i !== tile);
    },
  },
  endIf: (G, ctx) => {
    // TODO: define victory conditions
    const noHands = ctx.playOrder.every(
      (player) => G.hands[player].length === 0
    );
    if (noHands) {
      return { draw: true };
    }
  },
};
