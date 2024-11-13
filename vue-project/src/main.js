// NPM方式
import Vue from 'vue/dist/vue.common';

// // 需要实例化 Vue
// new Vue({
//     template:`<div>Hello World</div>`
// }).$mount("#app");

// Vue();

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