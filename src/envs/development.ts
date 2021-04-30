import { Env } from "./index";

export const developmentEnv: Env = {
  master: {
    url: "http://localhost:8000",
    pathPrefix: "/api",
    port: 8000,
  },
};
