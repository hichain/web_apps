import { Server } from "boardgame.io/server";
import { exit } from "process";
import { games } from "../../games";
import { envs } from "../../envs";

const port = envs?.master?.port;
if (port == null) {
  exit(1);
}

const server = Server({ games });
server.run(port);
