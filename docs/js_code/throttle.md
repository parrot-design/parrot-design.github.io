# 手写节流函数

> 在一定的时间内只触发一次

```js
function throttle(fn,ms){
    let timer=null,context;
    return function(){
        context=this;
        if(!timer){
            timer=setTimeout(()=>{
                fn.apply(this,arguments);
                clearTimeout(timer);
                timer=null;
            },ms);
        }
    }
}
```