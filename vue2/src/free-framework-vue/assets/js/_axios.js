import axios from 'axios';
import router from '@/router'
import free from './_free'
import mock from './_mock'
import { Message } from 'element-ui';
//默认配置
// let  baseURL = "http://192.168.13.242:8080/bf-portal/portal/"  //leahpi
let fromAppId = ''
let platform = ''
let _opts = {}
function initInstance(){
  let instance = axios.create({
    // baseURL: baseURL, 
    timeout: 60000,
    withCredentials: true,
    transformRequest: [
      data => {
        if(data instanceof FormData){
          data.append('fromAppId',fromAppId);
          data.append('platform',platform);
          return data;
        }
        data.fromAppId = fromAppId;
        data.platform =platform
        // data.platform = 'app';
        return JSON.stringify(data);
      }
    ]
  });
  //请求拦截器
  instance.interceptors.request.use(
    config=>{
      //自动携带token
      let accessToken = free.getToken()
      
      if (accessToken) {
        config.headers['accessToken'] = accessToken;
      }
      return config;
    }, 
    error =>{
      console.log(error)
      return Promise.reject(error);
    }
  );
  //响应拦截器
  instance.interceptors.response.use(
    response => {
      let data = response.data;
      if (!data.success) {
        if(data.errCode == -5){
          console.error(-5,response)
          if(_opts.isBack!==false){
            router.app.$router.push({name:'index',query:{isBack:true}})
          }else if(_opts.loginTimeout){
            _opts.loginTimeout()
          }
        }else if( data.errCode == -4){
          Message.error('服务器开小差了，请稍后再试');
        }else{
          Message.error(data.errDes);
        }
      }
      return Promise.resolve(data);
    }, 
    error => {
      return Promise.reject(error.response)
    }
  )
  return instance
}

function getAjaxApi(config){
  let baseURL = process.env.VUE_APP_REQUEST_URL;
  if(/192\.168\.16\.\d{1,3}/.test(location.host)){
    let host = '';
    if(location.host.indexOf(':') != -1){
        host = location.host.substring(0,location.host.indexOf(':'));
    } else {
        host = location.host;
    }
    baseURL = location.protocol + "//" + host;
    let requestUrlTemp = process.env.VUE_APP_REQUEST_URL.replace('http://','');
    if(requestUrlTemp.lastIndexOf(":") != -1){
      baseURL = baseURL + ":" + requestUrlTemp.substring(requestUrlTemp.lastIndexOf(":")+1);
    }
  }else if(/hrp.*\.hrpackage\.com/.test(location.host)){
    baseURL = location.protocol + "//" + location.host;
  }
  console.info(baseURL);
  //带portalUrl的url
  if(config.portalUrl){
    return baseURL + config.portalUrl
  }
  // 如果是mock数据
  // if(process.env.NODE_ENV=='dev' && config._mockUrl){
  //   return 'http://localhost:3000/' + config.apiNum
  // }
  let apiType =  config.apiType ? config.apiType : 'hro';
  let apiUrl = config.apiNum;
  if (apiType == 'az') {
    apiUrl = 'az/' + apiUrl;
  } else {
    apiUrl = 'sv/' + apiType + '/' + apiUrl;
  }
  
  return baseURL + '/bf-portal/portal/' + apiUrl;
  // return 'http://192.168.13.217:8080/bf-portal/portal/' + apiUrl;
  // return 'http://192.168.13.242:8080/bf-portal/portal/' + apiUrl;
}
//ajax请求
const ajax = (config)=>{
    let url = getAjaxApi(config);
    return new Promise(function(resolve, reject) {
      //模拟数据
      if(['mock_add','mock_update','mock_delete','mock_get','mock_getOr'].includes(config.type)){
        let data = Object.assign({},config.data);
        mock.init(_opts)
        mock[config.type](config,data,(res)=>{
          resolve(res)
        })
        return;
      }
      //如果是打开url
      if(config.type=='openUrl'){
        let data = JSON.parse(JSON.stringify(config.data));
        data.accessToken = free.getToken();
        data.fromAppId = fromAppId;
        let urlParams = free.objToUrlParams(data)
        window.open(url + '?' + urlParams)
        return;
      }
      //如果是表单提交
      if(config.type=='formSubmit'){
          requestForm(config);
          resolve();
          return;
      }
      //如果是最终配置
      if(config.type == 'configJson'){
        let r = config.finalConfig;
        r = free.deepCloneObj(r)
        resolve({
          "success": true,
          "errCode": 0,
          "errDes": null,
          "result":r
        });
        return;
      }
      //如果是本地资源
      if(config.finalUrl){
        config.finalUrl = config.finalUrl.replace(/_/g,'/');
        // let result = require('@/assets/json/' + config.finalUrl);
        // let r = result.default || result;
        // r = free.deepCloneObj(r)
        resolve({
          "success": true,
          "errCode": 0,
          "errDes": null,
          // "result":r
        });
        return;
      }  
      //ajax提交
      let data = Object.assign({},config.data);
      if(config.type=='formData'){
        let formData = new FormData(); 
        Object.keys(data).forEach((key)=>{
          formData.append(key, data[key]);
        })
        data = formData
      }
      let instance = initInstance()
      instance({
        method: config.method ? config.method : 'POST',
        url: url,
        data: data,
        headers : {'Content-Type':'text/plain;charset=UTF-8','Accept':'application/json, text/javascript, */*'}
      }).then(
        response=>{
          resolve(response);
      }).catch(
        error=>{
          reject(error)
      })
    });
}
function generateHideElement(name, value) {
  var tempInput = document.createElement("input");
  tempInput.type = "hidden";
  tempInput.name = name;
  tempInput.value = value;
  return tempInput;
}
function requestForm(config) {
  var form = document.createElement("form");
  document.body.appendChild(form);
  form.appendChild(generateHideElement('accessToken', free.getToken()));
  form.appendChild(generateHideElement('fromAppId', fromAppId));
  Object.keys(config.data).forEach((key)=>{
    form.appendChild(generateHideElement(key, config.data[key]));
  })
  form.method = "post";
  form.action = getAjaxApi(config)
  form.submit();
}
const install = function(Vue,opts={}){
  fromAppId = opts.fromAppId
  platform = opts.platform
  _opts = opts;
  Vue.prototype['$' + (opts.axiosKey || 'axios')] = {
    ajax
  }
  
}
export default {
  ajax,
  axios,
  install
}; 