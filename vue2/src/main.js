import Vue from 'vue'
import App from './App.vue'
import { install } from './free-framework-vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './free-framework-vue/assets/css/dist/free-common.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

install(Vue);

new Vue({
  render: h => h(App),
}).$mount('#app')
