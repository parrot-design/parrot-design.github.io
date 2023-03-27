# 考点七：Ajax 和跨域

### 1.原生 js ajax 请求有几个步骤？分别是什么？

一共有 5 个步骤，如下：

```js
//1. 创建XMLHttpRequest对象
var ajax = new XMLHttpRequest();
//2. 规定请求的类型、URL以及是否异步处理请求。
ajax.open("GET", url, true);
//3. 发送信息至服务器时内容编码类型
ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//4. 发送请求
ajax.send(null);
//5. 接受服务端响应数据
ajax.onreadystatechange = function (res) {
  if (res.readyState === 4 && (res.status === 200 || res.status == 304)) {
  }
};
```

### 2.什么情况造成跨域？

> 同源策略限制，不同源会造成跨域。以下任意一种情况不同，都是不同源。

> 同源：1.协议； 2.域名； 3.端口号三者要求全部相同，只要有一个不相同就是非同源策略。

### 3.跨域解决方案有哪些？

1. 动态创建一个 script 标签，利用 script 标签的 src 属性不受同源策略限制。因为所有的 src 属性和 href 属性都不受同源策略限制。可以请求第三方服务器数据内容。

```js
//去创建一个script标签
var script = document.createElement("script");
//script的src属性设置接口地址 并带一个callback回调函数名称
script.src = "http://xxxx/index.php?callback=jsonpCallback";
//插入到页面
document.head.appendChild(script);
//通过定义函数名去接受后台返回数据
function jsonpCallback(data) {
  //注意 jsonp返回的数据是json对象可以直接使用
  //ajax 取得数据是json字符串需要转换成json对象才可以使用
}
```

2. CORS：跨域资源共享

> 原理：服务器设置 Access-Control-Allow-Origin HTTP 响应头之后，浏览器将会允许跨域请求限制：浏览 器需要支持 HTML5，可以支持 POST，PUT 等方法兼容 ie9 以上

```js
需要后台设置 
Access-Control-Allow-Origin: * //允许所有域名访问，或者 
Access-Control-Allow-Origin: http://a.com //只允许所有域名访问
```

3. 反向代理

> 属于后端的解决方案，需要搭建一个中转 nginx 服务器，用于转发请求。也是最正规的解决方案。

```js
//前端常配置webpack
devServer:{
  proxy:{
    xxxx
  }
}
```
