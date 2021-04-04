import { defaultEnv } from "./default";
import { Env } from "./index";

export const localEnv: Env = {
  ...defaultEnv,
  appUrl: "localhost",
};
