import { Game, Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Rule, ruleSet } from "./rules";
import { TileBoard } from "./board";
import { rotate, TileCell } from "./tile";
import { HandTiles } from "./hands";
import { playOrder } from "./player";

export type GameState = {
  rule: Rule;
  board: TileCell[];
  hands: HandTiles;
};

export type Moves = {
  clickCell: (x: number, y: number, handsIndex: number) => void;
  rotateTile: (index: number, dir: number) => void;
};

type InvalidMove = typeof INVALID_MOVE;

export const Slashchain: Game<GameState> & {
  name: string;
  minPlayers: number;
  maxPlayers: number;
} = {
  name: "slashchain",
  minPlayers: 2,
  maxPlayers: 2,
  setup: (): GameState => {
    return {
      rule: ruleSet.basic3,
      board: [],
      hands: ruleSet.basic3.hands,
    };
  },
  moves: {
    clickCell: (
      G: GameState,
      ctx: Ctx,
      x: number,
      y: number,
      handsIndex: number
    ): InvalidMove | undefined => {
      const player = playOrder[ctx.playOrderPos];
      if (player == null) {
        return INVALID_MOVE;
      }
      const board = new TileBoard(G.board);
      const tile = G.hands[player][handsIndex];
      if (tile == null) {
        return INVALID_MOVE;
      }
      const cell = { x, y };
      if (board.has(cell)) {
        return INVALID_MOVE;
      }
      G.board = [...G.board, { ...cell, tile }];
      G.hands[player].splice(handsIndex, 1);
    },
    rotateTile: (
      G: GameState,
      ctx: Ctx,
      index: number,
      dir: number
    ): InvalidMove | undefined => {
      const player = playOrder[ctx.playOrderPos];
      if (player == null) {
        return INVALID_MOVE;
      }
      const tile = G.hands[player][index];
      if (tile == null) {
        return INVALID_MOVE;
      }
      G.hands[player][index] = rotate(tile, dir);
    },
  },
  endIf: (G, _) => {
    // TODO: define victory conditions
    const noHands =
      G.hands.slash.length === 0 && G.hands.backslash.length === 0;
    if (noHands) {
      return { draw: true };
    }
  },
};
