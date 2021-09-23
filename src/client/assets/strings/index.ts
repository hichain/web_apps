const app = {
  title: "HICHAIN Apps",
  description:
    "The platform for games published Hichain Project.\nYou can play the games with your friends for free.",
} as const;

const games = {
  slashchain: {
    name: "slashchain",
    description:
      "シンプルで覚えやすいアブストラクトゲーム。\n使うタイルは6種類。\nスラッシュとバックスラッシュに分かれて、自分のラインを5つ繋げたら勝ち。",
  },
} as const;

const gameList = {
  games: "Games",
  recentlyPlayedMatches: "Recently Played Matches",
  noGames: "No Games are available.",
  noMatches: "No Matches are available.",
} as const;

const common = {
  play: "Play",
  learnMore: "Learn More",
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
  common,
  gameList,
  events,
  errors,
} as const;
