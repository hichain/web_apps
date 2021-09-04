const path = require("path");

module.exports = (config, _) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@strings": path.resolve(__dirname, "src/client/assets/strings"),
        "@images": path.resolve(__dirname, "src/client/assets/images"),
        "@css": path.resolve(__dirname, "src/client/assets/css"),
        "@routes": path.resolve(__dirname, "src/client/assets/routes"),
        "@games": path.resolve(__dirname, "src/games"),
        "@hooks": path.resolve(__dirname, "src/client/hooks"),
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
};
