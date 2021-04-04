import { Server } from "boardgame.io/server";
import { settings } from "hichain_web_app_games/dist";

export const server = Server({ games: settings.games });
