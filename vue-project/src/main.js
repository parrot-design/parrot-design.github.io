import Vue from "vue/dist/vue.esm.browser";
import Test from "./Test.vue"
// Vue.config.async = false;

Vue.component('test1',{
    template:`<div>hello</div>`
})
new Vue(Test).$mount("#app")

console.log("Vue.options==>",Vue.options)