import './assets/js/directives/dialogDrag';
import freebutton from './components/free-button';
import freewrap from './components/free-wrap';
import freeg from './components/free-g';
import freegeach from './components/free-g-each';
import freediv from './components/free-div';
import freecard from './components/free-card';
import _free from './assets/js/_free'
  
const components = {
    freebutton,
    freewrap,
    freeg,
    freegeach,
    freediv,
    freecard
}


const install = function(Vue){
    //注册组件
    Object.keys(components).forEach(key => {
        Vue.component(components[key].name, components[key]);
    });
    Vue.prototype['$free']={}
    //注册方法
    Object.keys(_free).forEach(key=>{
        Vue.prototype['$free'][key]=_free[key];
    });
}
    
console.warn('1.1.7')
// debugger
export { 
    install
    // Free,
    // _axios
}