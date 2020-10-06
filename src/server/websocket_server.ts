import { Server } from "boardgame.io/server";
import { Slashchain } from "../slashchain/game";

const server = Server({ games: [Slashchain] });

const PORT = process.env.PORT || "8000";
server.run(parseInt(PORT));
