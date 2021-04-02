import { Server } from "boardgame.io/server";
import { Slashchain } from "../client/games/slashchain/game";

const server = Server({ games: [Slashchain] });

const PORT = process.env.PORT;
if (PORT == null) {
  console.log("Port is undefined");
} else {
  server.run(parseInt(PORT));
}
