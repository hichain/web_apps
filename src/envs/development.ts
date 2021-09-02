import { Env } from "./index";

export const developmentEnv: Env = {
  client: {
    urls: ["http://localhost:3000"],
  },
  master: {
    url: "http://localhost:8000",
    port: 8000,
  },
};
