module.exports = {
    plugins: {
     'autoprefixer': {browsers: 'last 5 version'} 
      // "postcss-pxtorem": {
      //   "rootValue": 16,
      //   "propList": ["*"],
      //   // 注意：如果有使用第三方UI，则需要配置下忽略选择器不转换。
      //   // 规则是class中包含的字符串，如vantui中所有的class前缀都是van-。也可以是正则。
      //   // "selectorBlackList": ["van-"]
      // }
    },
};