import serve from "koa-static";
import path from "path";
import { exit } from "process";
import { settings } from "../../settings";
import { server } from "./index";

const masterPort = settings.gameMaster?.port;

if (masterPort) {
  const frontEndAppBuildPath = path.resolve(__dirname, "../../../build");
  server.app.use(serve(frontEndAppBuildPath));

  server.run({
    port: masterPort,
    callback: () => {
      server.app.use(
        async (ctx, next) =>
          await serve(frontEndAppBuildPath)(
            Object.assign(ctx, { path: "index.html" }),
            next
          )
      );
    },
  });
} else {
  console.log("Master Port is undefined");
  exit(1);
}
