import { Slashchain } from "@/games/index";
import { Client as SlashchainClient } from "./slashchain/app";
import { GameTopComponent as SlashchainTop } from "./slashchain";
import { GameMatchComponent as SlashchainMatch } from "./slashchain/match";

export { SlashchainClient };

export const gameComponents = {
  slashchain: {
    game: Slashchain,
    board: SlashchainClient,
    top: SlashchainTop,
    match: SlashchainMatch,
  },
};
