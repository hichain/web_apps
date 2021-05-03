const path = require("path");

module.exports = (config, _) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "src"),
        "@strings": path.resolve(__dirname, "src/client/assets/strings"),
        "@images": path.resolve(__dirname, "src/client/assets/images"),
        "@css": path.resolve(__dirname, "src/client/assets/css"),
        "@games": path.resolve(__dirname, "src/games"),
        "@hooks": path.resolve(__dirname, "src/client/hooks"),
        "@contexts": path.resolve(__dirname, "src/client/contexts"),
      },
    },
  };
};
