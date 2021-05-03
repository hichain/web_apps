export const routes = {
  root: "/",
  gameList: "/games",
  slashchain: {
    index: "/games/slashchain",
    match: "/games/slashchain/:matchID",
  },
  debugger: "/debug",
} as const;

export const pages = {
  gameList: "Games",
  slashchain: "slashchain",
  debugger: "Debugger",
} as const;
