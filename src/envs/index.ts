import { developmentEnv } from "./development";
import { productionEnv } from "./production";

export type Env = {
  appUrl: string;
  ports: {
    master: number;
  };
};

export const envs = (() => {
  switch (process.env.NODE_ENV) {
    case "development":
      return developmentEnv;
    case "production":
      return productionEnv;
    default:
      return undefined;
  }
})();
