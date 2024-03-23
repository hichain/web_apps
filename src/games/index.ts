import { Ctx, Game as BGIOGame } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import _ from "lodash";
import { Slashchain } from "./slashchain";

export * from "./common";
export * from "./slashchain";

export type InvalidMove = typeof INVALID_MOVE;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Move = (...args: any[]) => void;

type GameMoves<
  GameState extends Record<string, unknown>,
  Moves extends Record<string, Move>
> = {
  [K in keyof Moves]: (
    context: {
      G: GameState;
      ctx: Ctx;
    },
    ...args: Parameters<Moves[K]>
  ) => InvalidMove | void;
};

export type Game<
  Name extends string,
  GameState extends Record<string, unknown>,
  Moves extends Record<string, Move>
> = BGIOGame<GameState> & {
  name: Name;
  minPlayers: number;
  maxPlayers: number;
  moves: GameMoves<GameState, Moves>;
};

export const games = [Slashchain];
export const gameMap = {
  [Slashchain.name]: Slashchain,
} as const;

export type SupportedGame = keyof typeof gameMap;
export const supportedGames = _.keys(gameMap) as SupportedGame[];
