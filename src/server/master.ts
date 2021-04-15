import { Server } from "boardgame.io/server";
import { exit } from "process";
import { games } from "../games";
import { envs } from "../envs";

const masterPort = envs?.master?.port;
const lobbyPort = envs?.lobby?.port;

if (masterPort) {
  const server = Server({ games });
  server.run({
    port: masterPort,
    lobbyConfig:
      (lobbyPort && {
        apiPort: lobbyPort,
      }) ||
      undefined,
  });
} else {
  console.log("Master Port is undefined");
  exit(1);
}
