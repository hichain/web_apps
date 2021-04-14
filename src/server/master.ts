import { Server } from "boardgame.io/server";
import { games } from "../games";
import { envs } from "../envs";

const masterPort = envs?.master.port;
const lobbyPort = envs?.lobby.port;

const server = Server({ games });
server.run({
  port: masterPort,
  lobbyConfig:
    (lobbyPort && {
      apiPort: lobbyPort,
    }) ||
    undefined,
});
