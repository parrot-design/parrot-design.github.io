# Node.js核心模块EventEmitter库解析

Node中事件模块（events）内置的事件发布函数被各大JS库所引用，如Commander等，掌握EventEmitter对阅读源码很有帮助。

## 使用

node环境下无需安装，直接使用即可

```js
//加载事件模块
const events=require('events');

//实例化eventEmitter函数
const eventEmitter=new events.EventEmitter()
```

对应源码展示：

```js
//node events.js
module.exports = EventEmitter;
//添加EventEmitter方法
EventEmitter.EventEmitter = EventEmitter;
//执行时调用init方法
function EventEmitter(opts){
    EventEmitter.init.call(this, opts);
}
//
EventEmitter.init = function(opts) {

  if (this._events === undefined ||
      this._events === ObjectGetPrototypeOf(this)._events) {
    this._events = ObjectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;


  if (opts?.captureRejections) {
    if (typeof opts.captureRejections !== 'boolean') {
      throw new ERR_INVALID_ARG_TYPE('options.captureRejections',
                                     'boolean', opts.captureRejections);
    }
    this[kCapture] = Boolean(opts.captureRejections);
  } else {
    // Assigning the kCapture property directly saves an expensive
    // prototype lookup in a very sensitive hot path.
    this[kCapture] = EventEmitter.prototype[kCapture];
  }
};

```