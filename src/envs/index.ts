import { developmentEnv } from "./development";
import { productionEnv } from "./production";

export type Env = {
  master: {
    url?: string;
    pathPrefix: string;
    port?: number;
  };
};

export const envs = (() => {
  switch (process.env.NODE_ENV) {
    case "development":
      return developmentEnv;
    case "production":
      return productionEnv;
    default:
      console.error("NODE_ENV is undefined.");
      return undefined;
  }
})();
