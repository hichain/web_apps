const app = {
  title: "HICHAIN Apps",
} as const;

const games: { [game: string]: string } = {
  slashchain: "slashchain",
} as const;

const responseMessages = {
  games: {
    loading: "Loading Games...",
    failure: "No games are available.",
  },
} as const;

const events = {
  resetGame: "Reset",
} as const;

const errors = {
  getMatch: "Failed to get the match",
  joinMatch: "Failed to join the match",
  getGames: "Failed to fetch games",
  createMatch: "Failed to create a match",
} as const;

export const strings = {
  app,
  games,
  responseMessages,
  events,
  errors,
} as const;
