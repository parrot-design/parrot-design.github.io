# 考点三：作用域

### 1.执行以下代码的结果是什么？为什么？

```js
function test(){
    console.log(a);
    console.log(foo());
    var a=1;
    function foo(){
        return 2;
    }
}
test();
``` 

> 这段代码的执行结果是 undefined 和 2。原因是：变量和函数都被提升到了函数体的顶部。因此，当打印变量 a 时，它虽存在于函数体（因为 a 已 经被声明），但仍然是 undefined。函数 foo 执行后得到的结果是 2。

> 此题考察是的变量提升的知识点，变量提升：可以理解为把变量声明提升到当前执行环境的最顶端。  

### 2.谈谈你对作用域链的理解？

> 当所需要的变量，在所在的作用域中查找不到的时候，它会一层一层向上查找，直到找到全局作用域还没找到的时候，就会放弃查找。这种一层一层的关系，就是作用域链。


### 3.执行以下代码的结果是什么？为什么？

```js
var a=1;

function check(){
    return function(){
        console.log(a);
        console.log(b);
    }
}

var func=check();
func();
```

> 这段代码的执行结果是：1 和 报错 b is not defined。 

> 当作用域内找不到 a，会向上一层一层查找，最后找到了全局下的 a,输出结果为 1。同理，向上一层一层查 找，最后找不到 b，所以输出"Uncaught ReferenceError: b is not defined"。 

> 此题考察是的作用域和作用域链的知识点。

