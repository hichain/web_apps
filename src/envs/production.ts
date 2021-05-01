import { Env } from "./index";

const url = "https://hichain-web-apps.an.r.appspot.com";
const port = process.env.PORT;

export const productionEnv: Env = {
  master: {
    url,
    port: port != null ? Number(port) : undefined,
  },
};
