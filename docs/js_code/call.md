# 重写call方法

 
```js
// function fun(a,b){
//     console.log(this);
//     return a + b;
// }
// fun.myCall(window,1,2)
Function.prototype.myCall=function(instance,...args){
    //1.获取需要被执行的函数
    const fn = this;
    //2.对instance转成对象类型 防止它传入的是非对象类型
    const thisInstance=instance!==null && instance!==undefined ? Object(instance):window;
    //3.调用需要执行的函数
    thisInstance.fn=fn;
    let result=thisInstance.fn(...args);
    //4.返回结果
    return result;
}
```