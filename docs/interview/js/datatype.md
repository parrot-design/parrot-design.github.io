# 考点一：数据类型

### 1.Javascript 中有哪几种类型，分别是什么？

Javascript 中总共有八种数据类型：

1. 其中基础类型有`String`、`Number`、`Null`、`Undefined`、`Boolean`、`Symbol`、`谷歌67出现的BigInt`。
2. 引用类型有 `Object`【Object 仅仅指代一个大类，function 函数、array 数组、date 日期都属于 Object】。

### 2.Null 和 Undefined 有什么区别？

1. undefined：表示变量声明过但未赋值，它是所有未赋值变量初始值。

2. null：主动释放一个变量引用的对象，表示一个变量不再指向任何对象地址。当使用完一个比较大的对象时，需要对其释放内存，设置为 null。

### 3.列举三种强制类型转换和两种隐式类型转换？

强制类型转换：

1. Number("10") 转化为 number 类型。
2. parseInt("20.9") 转化为 number 取整，小数部分直接舍去。
3. parseFloat("10.5") 转化为 number 保留小数。
4. String(10) 转化为 string 类型。
5. Boolean(1) 转化为 boolean 类型。


隐式类型转换：

1. 四则运算转换

加法运算符+是双目运算符，只要其中一个是String类型，表达式的值便是一个String。对于其他的四则运算，只要其中一个是Number类型，表达式的值便是一个Number。比如：
> "10" + 10，加号遇到字符串变成连接符，20隐式转换为字符串。

> 1+true，true隐式转换为1。

2. 判断语句转换

判断语句的判断条件需要是Boolean类型，所以条件表达式会被隐式转换为Boolean。其转换规则则同的Boolean的构造函数。比如：

> 10=="10" "10"隐式转换为10