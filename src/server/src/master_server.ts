import { exit } from "process";
import { settings } from "../../settings";
import { server } from "./index";

const masterPort = settings.gameMaster?.port;

if (masterPort) {
  server.run({
    port: masterPort,
  });
} else {
  console.log("Master Port is undefined");
  exit(1);
}
