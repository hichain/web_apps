import { defaultEnv } from "./default";
import { Env } from "./index";

export const productionEnv: Env = {
  ...defaultEnv,
  appUrl: "https://hichain.herokuapp.com",
};
