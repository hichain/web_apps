import { exit } from "process";
import { settings } from "../settings";
import { server } from "./index";

const masterPort = settings.gameMaster?.port;
const lobbyPort = settings.lobby?.port;

if (masterPort) {
  server.run({
    port: masterPort,
    lobbyConfig: (lobbyPort && { apiPort: lobbyPort }) || undefined,
  });
} else {
  console.log("Master Port is undefined");
  exit(1);
}
