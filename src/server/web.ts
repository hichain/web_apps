import express from "express";
import { Server } from "boardgame.io/server";
import path from "path";
import { envs } from "../envs";
import { games } from "../games";

const app = express();

const frontEndAppBuildPath = path.resolve("./build");
const masterPort = envs?.master.port;
const lobbyPort = envs?.lobby.port;

app.use(express.static(frontEndAppBuildPath));

const server = Server({ games });
server.run(
  {
    port: masterPort,
    lobbyConfig:
      (lobbyPort && {
        apiPort: lobbyPort,
      }) ||
      undefined,
  },
  () => {
    app.listen(envs?.web.port, () => {
      console.log(`INFO: Web App serving on ${envs?.web.port}...`);
    });
  }
);
