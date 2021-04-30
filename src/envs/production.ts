import { Env } from "./index";

const url = window.location.origin;
const port = process.env.PORT;

export const productionEnv: Env = {
  master: {
    url: url != null ? `${url}/api` : undefined,
    port: port != null ? Number(port) : undefined,
  },
};
