import { Server } from "boardgame.io/server";
import { Slashchain } from "../slashchain/game";

const server = Server({ games: [Slashchain] });
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

server.run(PORT);
