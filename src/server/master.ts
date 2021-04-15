import { Server } from "boardgame.io/server";
import { exit } from "process";
import { games } from "../games";
import { envs } from "../envs";

const port = envs?.master.port;

if (port) {
  const server = Server({ games });
  server.run(port);
} else {
  console.log("Master Port is undefined");
  exit(1);
}
