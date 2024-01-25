const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const path = require("path")

const CopyPlugin = require("copy-webpack-plugin")
module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/manifests/manifest.dev.json"),
          to: path.resolve("dist/manifest.json"),
        },
      ],
    }),
  ],
})
