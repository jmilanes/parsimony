const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.[contenthash].js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new NodePolyfillPlugin()
  ]
};
