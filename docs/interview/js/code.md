# 考点十：编程题

### 1.编写代码，实现数组扁平化，把`[1,[2,[3,4]]]`转换为`[1,2,3,4]`

```js
function flatten(arr) {
  let result = [];
  for (let value of arr) {
    if (Array.isArray(value)) {
      result.push(...flatten(value));
    } else {
      result.push(value);
    }
  }
  return result;
}
```

### 2.编写代码，使用 ES6 特性，实现[1,1,2,2]去重。

```js
Array.from(new Set([1, 1, 2, 2]));
```

### 3.创建 10 个 a 标签，点击弹出对应序号

```js
var a
for(let i=0;i<10;i++){
    a=document.createElement('a');
    a.innerHTML=i+'<br>';
    a.addEventListener('click'.function(e){
        e.preventDefault();
        alert(1);
    })
    document.body.appendChild(a);
}
```

### 4.封装一个冒泡排序的函数。对数组[11,37,13,92,21,68]进行排序

### 5.编程题：编写一个函数，实现移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组。

```js
//arr=[2,3,4,5,7] item=2
function remove(arr, item) {
  let result = [];
  for (let value of arr) {
    if (item !== value) {
      result.push(value);
    }
  }
  return result;
}
```

### 6.编程题：编写一个函数，实现在数组 arr 中，查找值与 item 相等的元素出现的所有位置。

```js
//['ab','b','a','ac','a']
//'a'

function findIndexs(arr, item) {
  let indexs = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      indexs.push(i);
    }
  }
  return indexs;
}
```

### 7.编程题：var arr = [1,2,3,4,5] ; var arr2 = [3,4,9,5,6,7]; 将两数组比较，要求将 arr 里相同的部分与 arr2 不同的部分合并得到新数组 [3,5,4,9,6,7]。

```js
var arr = [1, 2, 3, 4, 5];
var arr2 = [3, 4, 9, 5, 6, 7];

function getArr(arr1, arr2) {
  return Array.from(new Set(arr1.concat(arr2)));
}
```

### 7.编程题：用 reduce 统计一个数组 ["apple","orange","apple","orange","pear","orange"] 中单词出现的次数。

```js
let arr = ["apple", "orange", "apple", "orange", "pear", "orange"];
function getCount(arr) {
  return arr.reduce((total, current) => {
    total[current] = total[current] + 1 || 1;
    return total;
  }, {});
}
getCount(arr);
```
