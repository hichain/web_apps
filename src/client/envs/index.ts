export const envs = {
  appVersion: import.meta.env.VITE_APP_VERSION?.toString(),
  masterUrl: import.meta.env.VITE_MASTER_URL?.toString(),
} as const;
