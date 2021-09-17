/* eslint-disable @typescript-eslint/no-explicit-any */
import { envs } from "@/envs";
import { getAPIResponse, PromiseValue } from "@utils/promise";
import { LobbyClient, LobbyClientError } from "boardgame.io/client";

export const lobbyServerURL = envs?.master.url;

const wrapAPI = <API extends (...args: any[]) => Promise<any>>(
  context: LobbyClient,
  api: API
) => {
  return (...args: Parameters<typeof api>) =>
    getAPIResponse<PromiseValue<ReturnType<typeof api>>, LobbyClientError>(
      api.call(context, ...args)
    );
};

const wrapClient = (client: LobbyClient) => ({
  getMatch: wrapAPI(client, client.getMatch),
  joinMatch: wrapAPI(client, client.joinMatch),
  createMatch: wrapAPI(client, client.createMatch),
  listGames: wrapAPI(client, client.listGames),
});

export const lobbyClient = wrapClient(
  new LobbyClient({ server: lobbyServerURL })
);
