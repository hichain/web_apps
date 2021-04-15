import { Server } from "boardgame.io/server";
import { exit } from "process";
import { games } from "../games";
import { envs } from "../envs";

if (!envs) {
  exit(1);
}

const port = envs.master.port;
const server = Server({ games });
server.run(port);
