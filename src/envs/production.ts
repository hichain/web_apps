import { Env } from "./index";

const port = import.meta.env.PORT;

export const productionEnv: Env = {
  version: import.meta.env.REACT_APP_VERSION?.toString(),
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
