const app = {
  title: "HICHAIN Apps",
} as const;

const games = {
  slashchain: {
    name: "slashchain",
    description:
      "シンプルで覚えやすいアブストラクトゲーム。\n使うタイルは6種類。\nスラッシュとバックスラッシュに分かれて、自分のラインを5つ繋げたら勝ち。",
  },
} as const;

const titles = {
  games: "Games",
  recentlyPlayedMatches: "Recently Played Matches",
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
  titles,
  events,
  errors,
} as const;
