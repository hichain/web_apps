import { developmentEnv } from "./development";
import { productionEnv } from "./production";

export type Env = {
  web: {
    port: number;
  };
  master: {
    url: string;
    port: number;
  };
  lobby: {
    url: string;
    port: number;
  };
};

export const envs = (() => {
  switch (process.env.NODE_ENV) {
    case "development":
      return developmentEnv;
    case "production":
      return productionEnv;
    default:
      console.log("NODE_ENV is undefined.");
      return undefined;
  }
})();
