# 考点九：this 关键字

### 1.执行以下代码的结果是什么？为什么？

```js
function foo() {
  console.log(this.a);
}
var a = 3;
var obj = {
  a: 2,
  foo: foo,
};
obj.foo();
```

> 运行结果是 2，因为是 obj 调用的 foo，所以 foo 的 this 指向了 obj，而 obj.a = 2。 此题考察对 this 指向的理解。

### 2.执行以下代码的结果是什么？为什么？

```js
var name = "windows-name";
function test() {
  var name = "cherry";
  console.log(this.name);
}
test();
```

> 运行结果是 windows-name，因为 this 永远指向最后调用它的那个对象，最后调用 a 的地方 a()；前面没 有调用的对象。那么就是全局对象 window，这就相当于是 window.a()；注意，这里我们没有使用严格模 式，如果使用严格模式的话，全局对象就是 undefined，。
