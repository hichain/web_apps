import { Server } from "boardgame.io/server";
import serve from "koa-static";
import path from "path";
import { Slashchain } from "../slashchain/game";

const server = Server({ games: [Slashchain] });
const PORT = process.env.PORT || "8000";

const frontEndAppBuildPath = path.resolve(__dirname, "..", "..", "build");
server.app.use(serve(frontEndAppBuildPath));

server.run(parseInt(PORT), () => {
  server.app.use(
    async (ctx, next) =>
      await serve(frontEndAppBuildPath)(
        Object.assign(ctx, { path: "index.html" }),
        next
      )
  );
});
