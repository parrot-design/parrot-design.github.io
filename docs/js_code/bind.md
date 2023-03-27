# 重写bind方法

```js
Function.prototype.myBind=function(instance,...args){
    //1.获取需要处理的函数
    const fn=this;
    //2.将instance转化为对象
    const thisInstance=instance!==null && instance!==undefined ? Object(instance) : window;
    //3.返回一个新函数
    let newFunc=function(...addArgs){
        thisIstance.fn = fn;
        thisIstance.fn(...args,...addArgs);
    }    
    return newFunc;
}
```