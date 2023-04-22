# 前端进阶脚手架必备：commander.js源码解析

在我们日常开发中，我们全局安装一个`node模块`后，即可在控制台输入：`packagename -v`来查看对应的包版本号。

那么如何做到`监听控制台输入并进行对应输出`呢？大部分的`node模块`都是使用`commander`模块。

## 使用

### 安装

```js
//安装commander
npm install -D commander
```

### 获取program对象

`program对象`是commander的实例化对象，一般有以下两种方法可以获得，而对于成为复杂的程序，创建本地Command对象是一种更好的方式。

```js
const commander = require('commander');
//内部提供了program实例
const { program }=commander;
//手动实例化一个commander实例
const program=new commander.Command();
```

commander有两个概念:

1. 配置（Option）
2. 命令（Command）

### 配置(Option)

```js
//添加帮助信息
program.usage();
//添加版本号
program.version(1.0.0);
//配合解析 必须添加
program.parse();
```

> 我们将自定义package叫做my-cli

- 配置`usage`可以执行 `my-cli -h(--help)`，查看所有帮助

```js
//执行my-cli -h(--help)
Usage: my-cli <command> [options]

Options:
  -h, --help  display help for command
```

- 配置`version`可以执行`my-cli -V(--version)`，查看版本号

```js
//执行my-cli -V(--version)
1.0.0
```

除了有`usage、version`两个全局配置外，也可以添加自定义配置

- option第一个参数表示命令，第二个参数表示备注，第三个参数表示默认值

```js
program.option('-d, --debug','是否开启调试模式',false)
program.option('-c, --config','指定配置文件路径')
```

### 命令注册

