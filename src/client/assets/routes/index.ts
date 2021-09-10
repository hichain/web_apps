export const routes = {
  root: "/",
  gameList: "/games",
  match: (game: string, matchID: string) => `/games/${game}/${matchID}`,
  game: (game: string) => `/games/${game}`,
  debugger: "/debug",
} as const;

export const pages = {
  gameList: "Games",
  slashchain: "slashchain",
  debugger: "Debugger",
} as const;
