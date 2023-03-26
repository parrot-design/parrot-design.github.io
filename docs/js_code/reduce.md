# 重写数组reduce方法

> 兼容下第二个参数 如果没有第二个参数 数组遍历是从数组的第二项进行遍历的 默认值为数组的第一项

```js
//[1,2,3].reduce((pre,current,index,arr)=>pre+current)
Array.prototype.myReduce=function(func,init){
    //1.获取需要被计算的数组
    const arr=Array.prototype.slice.call(this);
    //2.获取初始值 如果有第二个参数为第二个参数 则为数组第一个元素
    let initValue=init?init:arr[0]; 
    //3.获取遍历初始下标 如果有第二个参数则从0开始遍历 否则从数组第一项开始遍历
    const initIndex=init?0:1;
    //4.遍历数组 依次执行回调函数 将回调函数的返回值设置成这一轮遍历结束后的初始值
    for(let i=initIndex;i<arr.length;i++){
        initValue=func(initValue,arr[i],i,arr);
    }
    //5.返回初始值
    return initValue;
}
```