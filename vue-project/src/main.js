// NPM方式
import Vue from 'vue/dist/vue.esm.browser';
// import Fun from "./Fun.js"; 
 
// new Vue(Fun).$mount("#app");

const btnElement = document.createElement('button');
document.body.appendChild(btnElement);
btnElement.innerHTML = '点击';
btnElement.onclick = function(){
    // 点击事件
    debugger;
}


// A页面
let PageA = {
    msg:'Hello World',
    render(){
        const appElement = document.getElementById('#app');
        appElement.innerHTML = this.msg;
    }
}

// 存储依赖的页面
let Dep = [];

Object.defineProperty(PageA,'msg',{
    get(){
        //访问msg变量时执行
        console.log("访问了 msg变量")
    },
    set(){
        //设置msg变量时执行
        console.log("设置了 msg变量")
    }
})

// 执行渲染函数
PageA.render();
 