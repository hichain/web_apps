import { Server } from "boardgame.io/server";
import { exit } from "process";
import { games } from "../games";

const port = process.env.MASTER_PORT ?? process.env.PORT;
if (port == null) {
  console.error("PORT is undefined");
  exit(1);
}

const clientUrls = process.env.CLIENT_URLS?.split(",");

const server = Server({ games, origins: clientUrls });
server.run(Number(port));
