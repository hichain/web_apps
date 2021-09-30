import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import esLintPlugin from "vite-plugin-eslint";
import path from "path";

const createConfig = ({ mode }: UserConfig) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode ?? "development", process.cwd()),
  };

  return defineConfig({
    root: __dirname,
    publicDir: path.resolve(__dirname, "client/public"),
    plugins: [react(), esLintPlugin()],
    build: {
      sourcemap: true,
      outDir: "../dist/client",
    },
    resolve: {
      alias: {
        "@utils": path.resolve(__dirname, "client/utils"),
        "@redux": path.resolve(__dirname, "client/redux"),
        "@strings": path.resolve(__dirname, "client/assets/strings"),
        "@images": path.resolve(__dirname, "client/assets/images"),
        "@styles": path.resolve(__dirname, "client/assets/styles"),
        "@routes": path.resolve(__dirname, "client/assets/routes"),
        "@games": path.resolve(__dirname, "games"),
        "@": path.resolve(__dirname, "."),
        "xmlhttprequest-ssl":
          "./node_modules/engine.io-client/lib/xmlhttprequest.js",
      },
    },
  });
};

export default createConfig;
