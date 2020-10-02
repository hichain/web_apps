import { Server } from "boardgame.io/server";
import { Slashchain } from "../slashchain/game";
import dotenv from "dotenv";

const server = Server({ games: [Slashchain] });
dotenv.config();

const port = process.env.REACT_APP_MASTER_PORT;
if (port != null) {
  server.run(parseInt(port));
}
