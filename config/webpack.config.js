const path = require("path");
const root = path.resolve(__dirname, "../server");
const dist = path.resolve(__dirname, "../dist");

const MODE = "development";

const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  entry: root + "/Server.ts",
  target: "node",

  output: {
    path: dist,
    filename: "server.js",
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false, sourceMap: enabledSourceMap },
          },
        ],
      },
      {
        test: /(\.s[ac]ss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
        loader: "url-loader",
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
  },

  plugins: [],
};
