const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/manifests/manifest.prod.json"),
          to: path.resolve("dist/manifest.json"),
        },
      ],
    }),
  ],
})
