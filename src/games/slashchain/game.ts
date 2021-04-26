import { Game, Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Rule, ruleSet } from "./rules";
import { rotate, TileCell } from "./tile";
import { HandTiles } from "./hands";
import { playOrder } from "./player";
import { CellSet } from "../common";

export type GameState = {
  rule: Rule;
  board: TileCell[];
  hands: HandTiles;
};

export type Moves = {
  clickCell: (x: number, y: number, handsIndex: number, angle: number) => void;
};

type InvalidMove = typeof INVALID_MOVE;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GameMoves<T extends Record<string, (...args: any) => void>> = {
  [F in keyof T]: (G: GameState, ctx: Ctx, ...args: Parameters<T[F]>) => InvalidMove | void;
};

export const Slashchain: Game<GameState> & {
  name: string;
  minPlayers: number;
  maxPlayers: number;
  moves: GameMoves<Moves>;
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
    clickCell: (G, ctx, x, y, handsIndex, angle) => {
      const player = playOrder[ctx.playOrderPos];
      if (player == null) {
        return INVALID_MOVE;
      }
      const board = new CellSet(G.board);
      const cell = { x, y };
      if (board.has(cell)) {
        return INVALID_MOVE;
      }
      const tile = G.hands[player][handsIndex];
      if (tile == null) {
        return INVALID_MOVE;
      }
      const rotatedTile = rotate(tile, angle);
      G.board = [...G.board, { ...cell, tile: rotatedTile }];
      G.hands[player].splice(handsIndex, 1);
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
