import { developmentEnv } from "./development";
import { productionEnv } from "./production";

export type Env = {
  version?: string;
  client: {
    urls: string[];
  };
  master: {
    url?: string;
    port?: number;
  };
};

export const envs: Env | undefined = (() => {
  switch (import.meta.env.MODE) {
    case "development":
      return developmentEnv;
    case "production":
      return productionEnv;
    default:
      console.error("NODE_ENV is undefined.");
      return undefined;
  }
})();
