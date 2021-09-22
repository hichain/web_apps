export const routes = {
  root: "/",
  match: (game: string, matchID: string) => `/games/${game}/${matchID}`,
  game: (game: string) => `/games/${game}`,
  debugger: "/debug",
} as const;

export const pages = {
  gameList: "Games",
  match: (game: string) => game,
  game: (game: string) => game,
  debugger: "Debugger",
} as const;
