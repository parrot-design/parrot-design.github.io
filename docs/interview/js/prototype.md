# 考点五：原型链和继承

### 1.说一下你对原型和原型链的理解

> 原型链：当对象查找一个属性的时候，如果没有在自身找到，那么就会查找自身的原型，如果原型还没有 找到，那么会继续查找原型的原型，直到找到 Object.prototype 的原型时，此时原型为 null，查找停止。

> 这种通过通过原型链接的逐级向上的查找链被称为原型链。

> 原型链继承：一个对象可以使用另外一个对象的属性或者方法，就称之为继承。具体是通过将这个对象的 原型设置为另外一个对象，这样根据原型链的规则，如果查找一个对象属性且在自身不存在时，就会查找 另外一个对象，相当于一个对象可以使用另外一个对象的属性和方法了。

### 2. ES6 之前是如何使用 prototype 实现继承的？

```js
function Father(name) {
  this.name = name;
}
Father.prototype.myName = function () {
  return this.name;
};

//继承属性，通过借用构造函数调用
function Son(name, label) {
  Father.call(this, name);
  this.label = label;
}

//继承方法，创建备份
Son.prototype = Object.create(Father.prototype);
//必须设置回正确的构造函数，要不然再会发生判断类型出错
Son.prototype.constructor = Father;

Son.prototype.myLabel = function () {
  return this.label;
};
```
