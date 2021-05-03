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

export const strings = {
  app,
  games,
  responseMessages,
  events,
} as const;
