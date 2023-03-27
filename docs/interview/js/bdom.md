# 考点六：BOM 和 DOM 操作

### 1.什么是 BOM?什么是 DOM?

> BOM 是即浏览器对象模型。 BOM 提供了独立于内容，与浏览器窗口进行交互的对象； 由于 BOM 主要 用于管理窗口与窗口之间的通讯，因此其核心对象是 window； BOM 由一系列相关的对象构成，并且每 个对象都提供了很多方法与属性；

> DOM 是文档对象模型。利用 DOM 我们可以操作 HTML 中的元素，使得网页被下载到浏览器后，开发者 可以根据需求进行页面内容的修改。

### 2.说出几个你比较常用的 BOM 对象和方法？

> window 对象，是 JS 的最顶层对象，其他的 BOM 对象都是 window 对象的属性；

> document 对象，文档对象；

> location 对象，浏览器当前 URL 信息；

> navigator 对象，浏览器本身信息；

> screen 对象，客户端屏幕信息；

> history 对象，浏览器访问历史信息；

常用的方法：

> window.alert('提供信息')

> window.confirm('确认信息')

> window.prompt('弹出输入框')

> window.open("url 地址","打开的方式","新窗口的大小")

> window.close() 关闭当前的网页

> window.moveTo() 移动当前窗口

> window.resizeTo() 调整当前窗口的尺寸

> window.setTimeout(函数,时间) 只执行一次

> window.setInterval(函数,时间) 无限执行
