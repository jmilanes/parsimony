const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

//com
module.exports = merge(common, {
  mode: "production"
});
