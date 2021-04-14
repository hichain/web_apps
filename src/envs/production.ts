import { Env } from "./index";

const masterPort = Number(process.env.PORT ?? 8000);

export const productionEnv: Env = {
  master: {
    url: "https://hichain.herokuapp.com",
    port: masterPort,
  },
  lobby: {
    url: "https://hichain.herokuapp.com",
    port: 8080,
  },
};
