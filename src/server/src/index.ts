import { Server } from "boardgame.io/server";
import { settings } from "../settings";

export const server = Server({ games: settings.games });
