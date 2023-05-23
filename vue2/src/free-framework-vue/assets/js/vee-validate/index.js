import Vue from 'vue'
import {ValidationObserver,ValidationProvider,extend} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import {configure} from 'vee-validate';
import _rules from './rules'
import ruleFn from './ruleFn'
import free from '../_free'
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    // ...
  }
})
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

function errormsg(config){
  if(config.errorMsg){
    return config.errorMsg
  }
  //validLabel在table组件定义
  let label = config.label || config.validLabel
  if(label){
    let labelError = config.labelError || ''
    if(!labelError && label && label.indexOf('{')==-1){
      labelError = label
    }
    if(config.type=='input' || config.type=='textarea'){
      return '请输入' + labelError
    }else if(config.type=='table' ){
      return '请添加' + labelError
    } else {
      return '请选择' + labelError
    }
  }
  return '不可为空'
}
extend("required", {
  params: ["config",'data', 'topData'],
  validate: (value, { config,data, topData}) => {
    let isRequired = true;
    let commonData = null;
    // if(config.label=='职能')debugger
    //如果isShowD || required是表达式
    if(typeof config.isShowD =='string' || typeof config.required =='string'){
      if(data && data['GET_' + config.name]){
        commonData =data['GET_' + config.name]().getCommonData()
      }
    }
    //如果isShowD是false
    if(config.isShowD===false){
      return true;
    }
    //如果isShowD表达式返回false
    else if(typeof config.isShowD =='string'){
      let isShowD = free.calcCondition(config.isShowD,commonData);
      if(isShowD===false){
        return true;
      }
    }
    //如果required是false || undefined
    if(config.required===false || config.required===undefined){
      isRequired =  false
    }
    //如果required表达式返回false
    else if(typeof config.required =='string'){
      let required = free.calcCondition(config.required,commonData);
      if(required===false){
        isRequired =  false
      }
    }
    //如果不必填 && 没有校验规则
    if(isRequired===false && !config.rules){
      return true
    }

    //如果值是数组
    if (value instanceof Array) {
      //如果数组为空
      if (value.length == 0) {
        return errormsg(config)
      }
      //如果是上传组件
      if(config.type=='upload'){
        let isSuccess = true;
        value.forEach((item)=>{
          if(item.status==='ing'){
            isSuccess = false
          }
        })
        if(!isSuccess)return '请等待文件上传完成...'
      }
      //自定义方法校验
      if(typeof config.rules == 'object'){
        if(ruleFn[config.rules.type]){
          return ruleFn[config.rules.type]({config,data,value})
        }
      }
      return true
    }
    //如果值是字符串或数字
    else {

      //需要必填 && 值为空
      if (isRequired &&  (value===undefined || value==='' || value===null)) {
        return errormsg(config)
      }
      //如果有规则校验 && 有值
      else if(config.rules && !(value===undefined || value==='' || value===null)){
        //如果是字符串
        if(typeof config.rules == 'string'){
          let rules = _rules[config.rules]
          //如果存在正则校验
          if(rules){
            if(rules[0].test(value)){
              return true;
            }
            // 如果是表格编辑
            if(config.tableEdit){
              return config.validLabel +  rules[1]
            }
            return rules[1]
          }
          //如果存在自定义方法校验
          else if(ruleFn[config.rules]){
            return ruleFn[config.rules]({config,data,value})
          }
        }
        //如果是对象
        else if(typeof config.rules == 'object'){
          //自定义方法校验
          if(ruleFn[config.rules.type]){
            return ruleFn[config.rules.type]({config,data,value})
          }
        }
      }
      return true
    }

  },
  // message:
  //   "The difference between the two numbers is too great. The maximum allowed is difference is {maxDifference}."
});
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);