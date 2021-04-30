import { envs } from "@/envs";
import { LobbyClient } from "boardgame.io/client";

const origin = window.location.origin;
export const lobbyServerURL = `${origin}${envs?.master.pathPrefix}`;
export const lobbyClient = new LobbyClient({ server: lobbyServerURL });
