import { Env } from "./index";

const port = Number(process.env.PORT);

export const productionEnv: Env = {
  master:
    (isNaN(port) && {
      url: "https://hichain-master.herokuapp.com/",
      port: port,
    }) ||
    undefined,
  lobby:
    (isNaN(port) && {
      url: "https://hichain-master.herokuapp.com/",
      port: 8080,
    }) ||
    undefined,
};
