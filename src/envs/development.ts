import { Env } from "./index";

export const developmentEnv: Env = {
  master: {
    url: "http://localhost:8000",
    port: 8000,
  },
  lobby: {
    url: "http://localhost:8080",
    port: 8080,
  },
};
