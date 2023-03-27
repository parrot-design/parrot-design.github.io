# 手写冒泡排序

> j循环交换变量 i循环只是为了缩小j循环的范围

```js
//[5,4,1,3,0,9,8,7,2,6]

function bubbleSort(arr){
    //外层遍历控制遍历轮数
    for(let i=0;i<arr.length;i++){
        //内层遍历进行变量交换
        for(let j=0;j<arr.length-i-1;j++){ 
            //如果上一个值比下一个值大 进行变量交换
            if(arr[j]>arr[j+1]){
                //保存上一个值的临时值
                let temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            } 
        }
    }
}
```