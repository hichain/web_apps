import { envs } from "@/envs";
import { LobbyClient } from "boardgame.io/client";

export const lobbyServerURL = envs?.master.url;
export const lobbyClient = new LobbyClient({ server: lobbyServerURL });
