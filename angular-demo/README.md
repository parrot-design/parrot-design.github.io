# 1.修改node_modules无反应

https://runebook.dev/zh/docs/angular/cli/cache

```js
 "cli": {
    "analytics": "17feab4b-05ec-44b9-884c-48ee6efad091",
    "cache":{
      "enabled":false
    }
  }
```

# 2.package.json指定入口

1. 文件优先级：模块规范有ESM和commonJS两种，为了能够在node环境下原生执行ESM规范的脚本文件，.mjs文件就应运而生。当存在index.mjs和index.js这种同名不同后缀的文件时，import './index.js'或者require('./index.js')是会优先加载index.mjs文件的。也就是说 优先级mjs>js。
2. main:定义了 npm 包的入口文件，browser 环境和 node 环境均可使用
3. module:定义 npm 包的 ESM 规范的入口文件，browser 环境和 node 环境均可使用
4. browser:定义 npm 包在 browser 环境下的入口文件
5. exports优先级最高 意味着 你在package.json存在main module exports等字段 优先引入exports对应的入口文件。

# 3.自定义webpack配置

1. 安装指定插件配置webpack
2. 修改cache=false来去除缓存  否则修改node_module无效
3. 修改mode=develop来控制控制台的打印
