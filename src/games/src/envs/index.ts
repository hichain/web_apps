import { localEnv } from "./local";
import { productionEnv } from "./production";

export type Env = {
  appUrl: string;
  ports: {
    master: number;
  };
};

export const envs = (() => {
  switch (process.env.NODE_ENV) {
    case "local":
    case "development":
      return localEnv;
    case "production":
      return productionEnv;
    default:
      return undefined;
  }
})();
