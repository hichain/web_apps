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
    publicDir: path.resolve(__dirname, "public"),
    plugins: [react(), esLintPlugin()],
    build: {
      sourcemap: true,
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@utils": path.resolve(__dirname, "src/utils"),
        "@redux": path.resolve(__dirname, "src/redux"),
        "@strings": path.resolve(__dirname, "src/assets/strings"),
        "@images": path.resolve(__dirname, "src/assets/images"),
        "@styles": path.resolve(__dirname, "src/assets/styles"),
        "@routes": path.resolve(__dirname, "src/assets/routes"),
        "@envs": path.resolve(__dirname, "src/envs"),
        "@": path.resolve(__dirname, "src"),
        "xmlhttprequest-ssl": "engine.io-client/lib/xmlhttprequest.js",
      },
    },
  });
};

export default createConfig;
