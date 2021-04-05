import { Env } from "./index";

const port = Number(process.env.PORT);

export const productionEnv: Env = {
  apiUrl: "https://hichain-master.herokuapp.com/",
  ports: {
    master: isNaN(port) ? undefined : port,
  },
};
