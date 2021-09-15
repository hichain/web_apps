/* eslint-disable @typescript-eslint/no-explicit-any */
import { envs } from "@/envs";
import { LobbyClient, LobbyClientError } from "boardgame.io/client";

export const lobbyServerURL = envs?.master.url;

type Response<T> =
  | {
      ok: true;
      body: T;
    }
  | {
      ok: false;
      error: LobbyClientError;
    };

type PromiseResponse<T> = T extends Promise<infer R> ? R : never;

const getResponse = <T>(task: Promise<T>): Promise<Response<T>> =>
  task
    .then((body) => ({ ok: true, body } as const))
    .catch((error: LobbyClientError) => ({ ok: false, error } as const));

const wrapAPI = <API extends (...args: any[]) => Promise<any>>(
  context: LobbyClient,
  api: API
) => {
  return (...args: Parameters<typeof api>) =>
    getResponse<PromiseResponse<ReturnType<typeof api>>>(
      api.bind(context)(...args)
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
