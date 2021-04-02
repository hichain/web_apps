import { Game } from "boardgame.io";
import { Server } from "boardgame.io/server";
import serve from "koa-static";
import path from "path";
import { Slashchain } from "../client/games/slashchain/game";

const PORT = process.env.PORT;

const serveApp = (port: number, games: Game[]): void => {
  const server = Server({ games: games });
  const frontEndAppBuildPath = path.resolve(__dirname, "..", "..", "build");
  server.app.use(serve(frontEndAppBuildPath));

  server.run(port, () => {
    server.app.use(
      async (ctx, next) =>
        await serve(frontEndAppBuildPath)(
          Object.assign(ctx, { path: "index.html" }),
          next
        )
    );
  });
};

if (PORT == null) {
  console.log("Port is undefined");
} else {
  serveApp(parseInt(PORT), [Slashchain]);
}
