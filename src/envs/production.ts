import { Env } from "./index";

const url = process.env.MASTER_URL;
const port = process.env.PORT;

export const productionEnv: Env = (() => {
  if (url == null || port == null) {
    return {};
  }
  return {
    master: {
      url: `${url}/api`,
      port: Number(port),
    },
  };
})();
