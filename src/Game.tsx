import { Game, PlayerID } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

type GameState = {
  cells: Array<Cell>;
};
type Cell = PlayerID | null;

export const TicTacToe: Game<GameState> = {
  setup: () => ({ cells: Array(9).fill(null) }),
  turn: {
    moveLimit: 1,
  },
  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = ctx.currentPlayer;
    },
  },
  endIf: (G, ctx) => {
    if (isVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (isDraw(G.cells)) {
      return { draw: true };
    }
  },
};

// Return true if `cells` is in a winning configuration.
const isVictory = (cells: Array<Cell>) => {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winLines.some((winLine) =>
    winLine
      .map((i) => cells[i])
      .every((i) => i !== null && i === cells[winLine[0]])
  );
};

// Return true if all `cells` are occupied.
function isDraw(cells: Array<Cell>) {
  return !cells.some((c) => c === null);
}
