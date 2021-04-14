import { Env } from "./index";

const webPort = Number(process.env.PORT ?? 3000);

export const productionEnv: Env = {
  web: {
    port: webPort,
  },
  master: {
    url: "https://hichain.herokuapp.com:8000",
    port: 8000,
  },
  lobby: {
    url: "https://hichain.herokuapp.com:8080",
    port: 8080,
  },
};
