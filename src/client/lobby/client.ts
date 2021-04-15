import { envs } from "@/envs";
import { LobbyClient } from "boardgame.io/client";

export const lobbyClient = new LobbyClient({ server: envs?.lobby?.url });
