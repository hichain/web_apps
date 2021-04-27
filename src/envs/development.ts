import { Env } from "./index";

export const developmentEnv: Env = {
  web: {
    port: 3000,
  },
  master: {
    url: "http://localhost:8000",
    port: 8000,
  },
};
