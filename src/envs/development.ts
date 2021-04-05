import { defaultEnv } from "./default";
import { Env } from "./index";

export const developmentEnv: Env = {
  ...defaultEnv,
  appUrl: "localhost",
};
