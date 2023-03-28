# 手写防抖函数

```js
function debounce(func,delay){
    let timer=null,context;
    return function(){
        context=this;
        if(timer) clearTimeout(timer);
        timer=setTimeout(()=>{
            func.apply(context,arguments);
            clearTimeout(timer);
            timer=null;
        },delay);
    }
}
```