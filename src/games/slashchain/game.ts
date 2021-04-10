import { Game, Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { buildRule, RuleSet } from "./rules";
import { TileBoard, TileCell, Tile } from "./tile";
import { rotate } from "./tiles";

export type GameState = {
  ruleSet: RuleSet;
  board: TileCell[];
  hands: { [key: string]: Tile[] };
};

export type Moves = {
  clickCell: (x: number, y: number, handsIndex: number) => void;
  rotateTile: (index: number, dir: number) => void;
};

export const Slashchain: Game<GameState> & { name: string } = {
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
  moves: {
    clickCell: (
      G: GameState,
      ctx: Ctx,
      x: number,
      y: number,
      handsIndex: number
    ): "INVALID_MOVE" | undefined => {
      const myPlayerID = ctx.playerID;
      if (myPlayerID == null) {
        return INVALID_MOVE;
      }
      const board = new TileBoard(G.board);
      const tile = G.hands[myPlayerID]?.[handsIndex];
      if (tile == null) {
        return INVALID_MOVE;
      }
      const cell = { x, y, tile };
      if (board.has(cell)) {
        return INVALID_MOVE;
      }
      G.board = [...G.board, cell];
      G.hands[myPlayerID].splice(handsIndex, 1);
    },
    rotateTile: (
      G: GameState,
      ctx: Ctx,
      index: number,
      dir: number
    ): "INVALID_MOVE" | undefined => {
      const myPlayerID = ctx.playerID;
      if (myPlayerID == null) {
        return INVALID_MOVE;
      }
      const tile = G.hands[myPlayerID]?.[index];
      if (tile == null) {
        return INVALID_MOVE;
      }
      G.hands[myPlayerID][index] = rotate(tile, dir);
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
