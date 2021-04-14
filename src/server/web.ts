import { Server } from "boardgame.io/server";
import path from "path";
import { envs } from "../envs";
import { games } from "../games";
import serve from "koa-static";

const frontEndAppBuildPath = path.resolve("./build");
const masterPort = envs?.master.port;
const lobbyPort = envs?.lobby.port;

const server = Server({ games });
server.app.use(serve(frontEndAppBuildPath));

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
    server.app.use(
      async (ctx, next) =>
        await serve(frontEndAppBuildPath)(
          Object.assign(ctx, { path: "index.html" }),
          next
        )
    );
  }
);
