// NPM方式
import Vue from 'vue/dist/vue.common';
import Test from "./Test.vue";

// // 需要实例化 Vue
// new Vue({
//     template:`<div>Hello World</div>`
// }).$mount("#app");

new Vue({
    render(h){
        return h('div',[
          "苹果",
          "香蕉",
          "梨"
        ])
    }
}).$mount("#app");

const Child1 = Vue.extend({
    template:'<div>hello</div>'
})

const VueComponentChild = Child1.extend({
    data(){
        return {
            name:"VueComponentChildConstructor"
        }
    }
})
console.log(Vue.options)
console.log(Child1.options)
console.log(VueComponentChild.options)