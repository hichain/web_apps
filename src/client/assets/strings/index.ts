const app = {
  title: "HICHAIN Apps",
};

const games: { [game: string]: string } = {
  slashchain: "slashchain",
};

const responseMessages = {
  games: {
    loading: "Loading Games...",
    failure: "No games are available.",
  },
};

const events = {
  resetGame: "Reset",
};

const errors = {
  getMatch: "Failed to get the match",
  joinMatch: "Failed to join the match",
  getGames: "Failed to fetch games",
  createMatch: "Failed to create a match",
};

export const strings = {
  app,
  games,
  responseMessages,
  events,
  errors,
} as const;
