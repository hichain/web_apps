import { Env } from "./index";

const url = "https://hichain-master.herokuapp.com/";
const port = Number(process.env.PORT ?? 3000);

export const productionEnv: Env = {
  web: {
    port,
  },
  master: {
    url,
    port,
  }
};
