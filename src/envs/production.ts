import { Env } from "./index";

const port = process.env.PORT;

export const productionEnv: Env = {
  version: process.env.REACT_APP_VERSION,
  client: {
    urls: [
      "https://apps.hichain.jp",
      "https://hichain-web-apps.firebaseapp.com/",
      "https://hichain-web-apps.web.app/",
    ],
  },
  master: {
    url: "https://hichain-web-apps.an.r.appspot.com",
    port: port != null ? Number(port) : undefined,
  },
};
