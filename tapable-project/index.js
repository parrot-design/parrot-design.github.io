// =========================================文章1====================================================
// class SyncHook { 
//     constructor(){
//         this.listeners = [];
//     }
//     // 订阅监听函数
//     tap(listener){
//         this.listeners.push(listener);
//     }
//     // 发布执行函数
//     call(){
//         this.listeners.forEach(item => item());
//     }
// }

// =========================================文章2====================================================
// const { SyncHook } = require('tapable');

// class Webpack {
//     constructor(options){ 
//         // 设置选项
//         this.options = options;
//         // 1. 编译前阶段钩子
//         this.beforeCompileHook = new SyncHook();
//         // 2. 编译阶段钩子
//         this.compileHook = new SyncHook();
//         // 3. 编译后阶段钩子
//         this.afterCompileHook = new SyncHook(); 
//     }
//     // 开始进行编译
//     start(){
//         console.log("准备对插件进行注册...")
//         if(Array.isArray(this.options.plugins)){
//             for(const plugin of this.options.plugins){
//                 plugin.apply(this);
//             }
//         }
//         console.log("准备编译...")
//         this.beforeCompile();
//     }
//     // 1.编译前阶段
//     beforeCompile(){
//         console.log("开始编译...")
//         this.beforeCompileHook.call();
//         // 第一阶段结束，开始进入第二阶段
//         this.compile();
//     }
//     // 2.编译阶段
//     compile(){
//         console.log("正在编译...")
//         this.compileHook.call();
//         // 第二阶段结束，开始进入第三阶段
//         this.afterCompile();
//     }
//     // 3.构建模块阶段
//     afterCompile(){
//         console.log("编译完成...")
//         this.afterCompileHook.call();
//     } 
// }

// class WebpackPlugin {
//     apply(compiler){
//         compiler.beforeCompileHook.tap("WebpackPlugin", () => {
//             console.log("WebpackPlugin 插件正在进行编译前操作...")
//         })
//         compiler.compileHook.tap("WebpackPlugin", () => {
//             console.log("WebpackPlugin 插件正在进行编译操作...")
//         })
//         compiler.afterCompileHook.tap("WebpackPlugin", () => {
//             console.log("WebpackPlugin 插件完成编译操作...")
//         })
//     }
// }
// // 开始进行编译
// new Webpack({
//     plugins:[new WebpackPlugin()]
// }).start();
// =========================================文章3====================================================
// const { AsyncSeriesHook } = require('tapable');

// // 创建一个 AsyncSeriesHook 实例
// const hook = new AsyncSeriesHook(['arg1', 'arg2']);

// // 注册异步监听函数
// hook.tapAsync('FirstPlugin', (arg1, arg2, callback) => {
//     setTimeout(() => {
//         console.log('FirstPlugin:', arg1, arg2);
//         callback();
//     }, 1000);
// });

// hook.tapAsync('SecondPlugin', (arg1, arg2, callback) => {
//     setTimeout(() => {
//         console.log('SecondPlugin:', arg1, arg2);
//         callback();
//     }, 1000);
// });

// // 触发钩子
// hook.callAsync('Hello', 'World', () => {
//     console.log('All done!');
// });
// =========================================文章4====================================================
// class SyncHook{
//     constructor(args){
//         this.listeners = [];
//         this.args = args || [];
//     }
//     tap(name, listener){
//         this.listeners.push({name,listener});
//     }
//     call(...args){
//         // 如果存在参数
//         args = this.args.length > 0 ? args.slice(0, this.args.length) : [];
//         this.listeners.forEach(item => {
//             item.listener(...args);
//         })
//     }
// }

// const hook = new SyncHook(['arg1']);

// hook.tap('FirstPlugin', (arg1, arg2) => {
//     console.log('FirstPlugin:', arg1, arg2);
// });

// hook.tap('SecondPlugin', (arg1, arg2) => {
//     console.log('SecondPlugin:', arg1, arg2);
// });

// hook.call('hello','world');
// =========================================文章5====================================================
const { SyncHook } = require("tapable");

const hook = new SyncHook();

hook.tap('name',()=>console.log("name1"))
hook.tap('name2',()=>console.log("name2"))

hook.call();