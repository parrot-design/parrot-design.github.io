const { defineConfig } = require('@vue/cli-service')
const AnalysePlugin = require('./AnalysePlugin')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack:(config)=>{
    config.plugin('analyse').use(AnalysePlugin);
  }
})
