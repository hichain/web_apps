import { Server } from "boardgame.io/server";
import { exit } from "process";
import { settings } from "../settings";

const masterPort = settings.envs?.ports.master;

if (masterPort) {
  const server = Server({ games: settings.games });
  server.run({
    port: masterPort,
  });
} else {
  console.log("Master Port is undefined");
  exit(1);
}
