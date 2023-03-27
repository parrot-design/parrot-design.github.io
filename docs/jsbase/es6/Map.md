# Map

### 1.含义

因为 JS 中的对象键只能是字符串，在某些场景使用不方便，所以 ES6 提供了一个 Map 结构。它类似于对象，也是键值对的集合，但是“键”不局限于字符串，`各种类型的值`都可以当作键。

```js
const m = new Map([[{ a: "1" }, 2]]);
```

### 2.属性和方法

1. `size` 属性

```js
const map = new Map();
map.set("foo", true);
map.set("bar", false);

map.size; // 2
```

2. `Map.prototype.set(key, value)`

set 方法设置键名 key 对应的键值为 value，然后返回整个 Map 结构。如果 key 已经有值，则键值会被更新，否则就新生成该键。

```js
const m = new Map();

m.set("edition", 6); // 键是字符串
m.set(262, "standard"); // 键是数值
m.set(undefined, "nah"); // 键是 undefined
```

set 方法返回的是当前的 Map 对象，因此可以采用链式写法。

```js
let map = new Map().set(1, "a").set(2, "b").set(3, "c");
```

3. `Map.prototype.get(key)`

get 方法读取 key 对应的键值，如果找不到 key，返回 undefined。

```js
const m = new Map();

const hello = function () {
  console.log("hello");
};
m.set(hello, "Hello ES6!"); // 键是函数

m.get(hello); // Hello ES6!
```

4. `Map.prototype.has(key)`

has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

```js
const m = new Map();

m.set("edition", 6);
m.set(262, "standard");
m.set(undefined, "nah");

m.has("edition"); // true
m.has("years"); // false
m.has(262); // true
m.has(undefined); // true
```

5. `Map.prototype.delete(key)`

delete 方法删除某个键，返回 true。如果删除失败，返回 false。

```js
const m = new Map();
m.set(undefined, "nah");
m.has(undefined); // true

m.delete(undefined);
m.has(undefined); // false
```

6. `Map.prototype.clear()`

clear 方法清除所有成员，没有返回值。

```js
let map = new Map();
map.set("foo", true);
map.set("bar", false);

map.size; // 2
map.clear();
map.size; // 0
```

### 3.遍历方法

1. `Map.prototype.keys()`：返回键名的遍历器。
2. `Map.prototype.values()`：返回键值的遍历器。
3. `Map.prototype.entries()`：返回所有成员的遍历器。
4. `Map.prototype.forEach()`：遍历 Map 的所有成员。

> Map 的遍历顺序就是`插入顺序`。

> Map 结构转为数组结构，比较快速的方法是使用扩展运算符`（...）`。

### 4.与其他数据结构的相互转换

1. `Map 转为数组`

```js
const myMap = new Map().set(true, 7).set({ foo: 3 }, ["abc"]);
[...myMap];
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

2. `数组转为 Map`

将数组传入 Map 构造函数，就可以转为 Map。

```js
new Map([
  [true, 7],
  [{ foo: 3 }, ["abc"]],
]);
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```

3. `Map 转为对象`

如果所有 Map 的键都是字符串，它可以无损地转为对象。

```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map().set("yes", true).set("no", false);
strMapToObj(myMap);
```

如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

4. `对象转为 Map`

对象转为 Map 可以通过`Object.entries()`。

```js
let obj = { a: 1, b: 2 };
let map = new Map(Object.entries(obj));

//此外，也可以自己实现一个转换函数。
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({ yes: true, no: false });
// Map {"yes" => true, "no" => false}
```

5. `Map 转为 JSON`

Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

```js
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set("yes", true).set("no", false);
strMapToJson(myMap);
// '{"yes":true,"no":false}'
```

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```js
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({ foo: 3 }, ["abc"]);
mapToArrayJson(myMap);
// '[[true,7],[{"foo":3},["abc"]]]'
```

6. `JSON 转为 Map`

SON 转为 Map，正常情况下，所有键名都是字符串。

```js
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}');

// Map {'yes' => true, 'no' => false}
```

但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

```js
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]');
// Map {true => 7, Object {foo: 3} => ['abc']}
```
