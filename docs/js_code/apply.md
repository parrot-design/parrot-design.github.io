# 重写apply方法

```js
// function fun(a,b){
//     console.log(this);
//     return a + b;
// }
// fun.myApply(window,1,2)
Function.prototype.myApply=function(instance,args){
    //1.获取需要执行的函数
    const fn=this;
    //2.将instance转换为对象
    const thisInstance=instance!==null && instance!==undefined?Object(instance):window;
    //3.执行函数 更改this指向为传入的instance （隐式绑定）
    thisInstance.fn=fn;
    let result=thisInstance.fn(...args);
    //4.返回结果
    return result;
}
```