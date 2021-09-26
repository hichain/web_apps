import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import esLintPlugin from "vite-plugin-eslint";
import path from "path";

const createConfig = ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), esLintPlugin()],
    build: {
      sourcemap: true,
    },
    resolve: {
      alias: {
        "@utils": path.resolve(__dirname, "src/client/utils"),
        "@redux": path.resolve(__dirname, "src/client/redux"),
        "@strings": path.resolve(__dirname, "src/client/assets/strings"),
        "@images": path.resolve(__dirname, "src/client/assets/images"),
        "@styles": path.resolve(__dirname, "src/client/assets/styles"),
        "@routes": path.resolve(__dirname, "src/client/assets/routes"),
        "@games": path.resolve(__dirname, "src/games"),
        "@": path.resolve(__dirname, "src"),
      },
    },
  });
};

export default createConfig;
