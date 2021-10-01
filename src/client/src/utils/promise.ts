/* eslint-disable @typescript-eslint/no-explicit-any */

export type PromiseValue<T> = T extends Promise<infer V> ? V : never;

export type APIResponse<T, Error> =
  | {
      ok: true;
      body: T;
    }
  | {
      ok: false;
      error: Error;
    };

export const getAPIResponse = <T, Error>(
  task: Promise<T>
): Promise<APIResponse<T, Error>> =>
  task
    .then((body) => ({ ok: true, body } as const))
    .catch((error: Error) => ({ ok: false, error } as const));
