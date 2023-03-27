# Set

### 1.基本用法

类似于数组，但是成员的值都是唯一的，没有重复的值。如下

```js
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach((x) => s.add(x));

for (let i of s) {
  console.log(i);
}
//2 3 5 4
```

### 2.实例属性和方法

1. `Set.prototype.constructor`

构造函数，默认就是 Set 函数。

2. `Set.prototype.size`

返回 Set 实例的成员总数。

3. `Set.prototype.add(value)`

添加某个值，返回 Set 结构本身。

4. `Set.prototype.delete(value)`

删除某个值，返回一个布尔值，表示删除是否成功。

5. `Set.prototype.has(value)`

返回一个布尔值，表示该值是否为 Set 的成员。

6. `Set.prototype.clear()`

清除所有成员，没有返回值。

### 3.遍历操作

1. `Set.prototype.keys()`：返回键名的遍历器。
2. `Set.prototype.values()`：返回键值的遍历器。
3. `Set.prototype.entries()`：返回键值对的遍历器。
4. `Set.prototype.forEach()`：使用回调函数遍历每个成员。
