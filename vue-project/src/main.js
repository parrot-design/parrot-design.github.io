import Vue from "vue/dist/vue.esm.browser";
// Vue.config.async = false;

new Vue({
    template:`<div>{{ msg }}</div>`,
    data(){
        return {
            msg:"inited"
        }
    },
    mounted(){
        this.msg = '第一次渲染'; 
        this.msg = '第二次渲染'; 
    }
}).$mount("#app")