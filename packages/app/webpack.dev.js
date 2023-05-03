const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: "./index.html",
    port: 1234,
    open: false
  }
});
