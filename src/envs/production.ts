import { Env } from "./index";

const url = process.env.MASTER_URL;
const port = process.env.PORT;

export const productionEnv: Env = {
  master: {
    url: url != null ? `${url}/api` : undefined,
    pathPrefix: "/api",
    port: port != null ? Number(port) : undefined,
  },
};
