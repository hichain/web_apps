import { Game, Ctx, PlayerID } from "boardgame.io";

type GameState = {
  cells: Array<PlayerID | null>;
};

export const TicTacToe: Game<GameState> = {
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell: (G, ctx, id) => {
      G.cells[id] = ctx.currentPlayer;
    },
  },
};
