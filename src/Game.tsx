import { Game, PlayerID } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

type GameState = {
  cells: Array<PlayerID | null>;
};

export const TicTacToe: Game<GameState> = {
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = ctx.currentPlayer;
    },
  },
};
