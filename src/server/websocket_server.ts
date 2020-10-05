import { Server } from "boardgame.io/server";
import { Slashchain } from "../slashchain/game";
import dotenv from "dotenv";

const server = Server({ games: [Slashchain] });
dotenv.config();

const port = process.env.PORT || "8000"
if (port != null) {
  server.run(parseInt(port));
}
