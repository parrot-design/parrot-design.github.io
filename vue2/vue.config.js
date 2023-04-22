const AnalysePlugin = require("./AnalysePlugin");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("test").use(AnalysePlugin).use(SpeedMeasureWebpackPlugin);
  },
});
