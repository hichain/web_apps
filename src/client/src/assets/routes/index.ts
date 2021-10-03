export const routes = {
  root: "/",
  match: (game: string, matchID: string) => `/games/${game}/${matchID}`,
  game: (game: string) => `/games/${game}`,
  debugger: "/debug",
} as const;

export const pages = {
  match: (game: string) => game,
  game: (game: string) => game,
  debugger: "Debugger",
} as const;

export const externalLinks = {
  top: "https://hichain.jp",
  games: {
    slashchain: "https://hichain.jp/slashchain/",
  },
} as const;
