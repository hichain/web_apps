export const routes = {
  root: "/",
  gameList: "/games",
  games: {
    slashchain: {
      index: "/games/slashchain",
      match: (matchID: string) => `/games/slashchain/${matchID}`,
    },
  },
  debugger: "/debug",
} as const;

export const pages = {
  gameList: "Games",
  slashchain: "slashchain",
  debugger: "Debugger",
} as const;
