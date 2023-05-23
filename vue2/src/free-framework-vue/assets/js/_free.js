
import _axios from './_axios.js';
import _getOption from './_getOption'
import store from '@/store';
import router from '@/router'
import { Loading,MessageBox,Message } from 'element-ui';
import moment from 'moment'
let filter = {
    arrToString(value,key){
        let arr =  []
        value.forEach((item)=>{
            arr.push(item[key])
        })
        return arr.join(',')
    },
    arrToArr(value,key,filter){
        let arr =  []
        value.forEach((item)=>{
            if(filter.removeRepeat){
                if(!arr.includes(item[key]))arr.push(item[key])
            }else{
                arr.push(item[key])
            }

        })
        return arr
    },
    //问卷调查空处理成0
    emptyToZero(_value){
        let value = JSON.parse(JSON.stringify(_value))
        value.forEach((item)=>{
            item.answer.forEach((item2)=>{
                if(!item2.score)item2.score = 0
            })
        })
        return value
    }
}
function arrToArr(settings){
    let {commonData,config} = settings;

    let arr = commonData[config.key]
    let newArr = []
    arr.forEach((item)=>{
        newArr.push(item[config.arrKey])

    })

    return newArr;
}
function getParams(params,commonData){
    if(typeof params =='function'){
        return params(commonData)
    }
    if(!params)params=[]
    let data = {};
    let isPass = true
    params.forEach((item)=>{
        if(isPass===false)return;
        let {key,value} = item;
        let v = {}
        if(item.params){
            let _v = this.getParams(item.params,commonData)
            if(_v===false){
                isPass=false;
                return;
            }
            if(item.type=='array'){
                v = [_v]
            }else{
                v = _v;
            }

        }else{
            if(typeof value == 'string' && value.indexOf('{')!=-1){
                v = commonData;
                v = this.calcCondition(value,commonData)

            }else{
                v = value
            }
        }
        if(item.filter){
            v = filter[item.filter.type](v,item.filter.key,item.filter)
        }

        if(key){
            if(item.removeEmpty){
                if(!this.isUndefined(v)){
                    data[key] = v;
                }else{
                    delete data[key]
                }
            }else{
                if(data[key] && item.merge){
                    if(Array.isArray(data[key])){
                        //判断条件
                        if(item.condition && typeof item.condition == 'string' && item.condition.indexOf('{')>-1){
                            if(this.calcCondition(item.condition,commonData)){
                                data[key] = data[key].concat(v)
                            }
                        }else{
                            data[key] = data[key].concat(v)
                        }
                    }
                }else{
                    data[key] = v;
                }

            }
        }else{
            if(item.removeEmpty){
                Object.keys(v).forEach((k)=>{
                    if(this.isUndefined(v[k])){
                        delete v[k]
                    }
                })
            }
            Object.assign(data,v)
        }
        if(item.required && this.isUndefined(v)){
            isPass = false;
        }

    })
    if(!isPass)return false
    return data;
}
//支持js语法计算
function calcCondition(condition,commonData,isErrorRetun){
    let _condition = condition;
    // debugger
    if(typeof condition =='string' && condition.indexOf('{')!=-1){
        //如果是替换字符串
        if(condition.indexOf('${')>-1){
            condition = condition.replace(/\${/g,'${commonData.');
        }else{
            if(condition.indexOf('{{')!=-1){
                condition = condition.replace(/{{/g,'commonData.');
            }else{
                condition = condition.replace(/{/g,'commonData.');
            }

            condition = condition.replace(/}/g,'');
        }
        try{
            return eval(condition)
        }catch (error) {
            //报错是否返回值
            if(isErrorRetun){
                return _condition
            }else{
                console.error(error,_condition,commonData)
            }
        }
    }
    return _condition;

}

function getOption(config,id,commonData){
   return  _getOption.init(config,id,commonData)
}
function getOptionCommon(key,id){
    let commonSelect = JSON.parse(localStorage.getItem('free_commonSelect'));
    let options = commonSelect[key];
    options = options.filter((option)=>{
        return option.id == id
    })
    if(options.length>0){
        return options[0]
    }
    return null
}
function clearOptionCache(settings){
    return  _getOption.clearCache(settings)
}
function refreshCommonOption(settings){
    let {config,commonData} = settings;
    return  _getOption.refreshCommonOption(config,commonData)
}
function getToken(){
    let user = localStorage.getItem('user');
    let accessToken = ''
    if(user){
        accessToken = JSON.parse(user).accessToken
    }
    return accessToken;
}
function toTree(data, id, pid) { //pid 为关联id 菜单遍历
    // 删除 所有 children,以防止多次调用
    data.forEach(function (item) {
        delete item.children;
    });
    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    let map = {};
    data.forEach(function (item) {
        item.value = item.id
        map[item[id]] = item;
    });
    let result = [];
    data.forEach(function (item) {
        item.label = item.nameZhCn
        // 以当前遍历项的pid,去map对象中找到索引的id
        let parent = map[item[pid]];
        //如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 result结果集中，作为顶级
            result.push(item);
        }
    });
    let maxLevel = 0
    function goon(arr,level){

        if(level>maxLevel)maxLevel = level
        arr.forEach((item)=>{
            if(item.children){
                goon(item.children,++level)
            }
        })
    }
    goon(result,1);
    return result;
}
function isUndefined(value){
    if(value===undefined || value==='' || value===null){
        return true
    }
    return false;
}
function objToUrlParams(obj) {
    var str = '';
    for (var i in obj) {
        str += i + '=' + obj[i] + '&';
    }
    str = str.substring(0, str.length - 1)
    return str;
}
function isAllEqual(array) {
    if (array.length > 0) {
        return !array.some(function (value, index) {
            return value !== array[0];
        });
    } else {
        return true;
    }
}

function isAllEqualValue(array,_value) {
    let bool;
    if (array.length > 0) {
        bool =  !array.some(function (value, index) {
            return value !== _value;
        });
    } else {
        bool = true;
    }
    return bool;
}

function isHasValue(array,valueArr) {
    let bool;
    if (array.length > 0 && valueArr.length >0) {
        bool = array.some(function (value, index) {
            return valueArr.toString().includes(value) ;
        });
    } else {
        bool = false;
    }
    return bool;
}

function goBack(settings){
    let {commonData} = settings;
    let t = commonData.this;
    t.$router.go(-1)
}
function appendEvent(){

}

function openUrl(settings) {
    let { commonData, config } = settings;
    let { url } = this.getParams(config.params, commonData)
    window.open(url)
}

function toGetParamsArr(arr){
    let str = '';
    if(arr.length > 0){
        arr.forEach(item =>{
            str += toGetParams(item);
        })
    }
    return str;
}

// 将对象 组装成get 参数
function toGetParams(data) {
    var str = null;
    for (let key in data) {
        str = '&' + key + '=' + data[key]
    }
    return str;
}

function recu(_obj,cb){
    let _redc = (obj,closestObj,_key)=>{
        cb(obj,closestObj,_key)
         for(let key in obj){
             if(obj[key] instanceof Object){
                 if(!Array.isArray(obj)){
                    closestObj = obj
                 }
                 _redc(obj[key],closestObj,key)
             }else{


             }

         }
     }
     _redc(_obj)
}
// setTimeout(()=>{
//     recu([
//         {a:2,children:[
//             {b:3,children:[
//                 {c:4,d:{
//                     e:5
//                 }}
//             ]}
//         ]}
//     ],(item,closestObj)=>{
//         console.log(item,JSON.stringify(closestObj))
//     })
// },2000)
//获取权限列表
function getAuthArr(settings = {},to = {}){
    let {config} = settings;
    let authArr = null;

    if(!(config && config.refresh)){
        if(store.state.authArr)return Promise.resolve()
        try {
            authArr = JSON.parse(localStorage.getItem('authArr'))
        } catch (error) {

        }
        if(authArr){
            store.state.authArr = authArr;
            return Promise.resolve()
        }
    }

    if(to.path == '/'){
        return Promise.resolve()
    }
    else if(!config && settings.commonData.this.$route.path =='/' ) {
        return Promise.resolve()
    }
    return this.ajax({
        config:{
            api: config.api || {
                apiNum:140100003,
                appType:'rms',
                params:[
                    {key:"category",value:[1,2,3]},
                ]
            },
        },
      }).then((result)=>{
        store.state.authArr = result;
        localStorage.setItem('authArr',JSON.stringify(result))
      })
}
function strlen(str){
    var len = 0;
    for (var i=0; i<str.length; i++) {
     var c = str.charCodeAt(i);
    //单字节加1
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
       len++;
     }
     else {
      len+=2;
     }
    }
    return len;
}
function triggerChange(_obj,settings){
    let redc = (obj)=>{
         for(let key in obj){
            if(obj['GET_' + key]){
                let fn = obj['GET_' + key]()
                if(fn && fn.change){
                    settings.triggerType = 'setData'
                    fn.change(settings)
                }
             }
             if(obj[key] instanceof Object){
                 redc(obj[key])
             }
         }
     }
     redc(_obj)
}
function setCommonData(settings){
    let {config,commonData} = settings;
    config.condition.forEach((item)=>{
        let bool = this.calcCondition(item.if,commonData)
        if(bool){
            // commonData.this.$set(commonData,[item.key],item.value)
            Object.assign(commonData[item.key],item.value)
        }
    })
}

function arrayObjecAssign(settings){
    let {config,commonData} = settings;
    let {path,params,filterArr1,mergeArr} = config;
    let data = commonData;
    let _params = this.getParams(params,commonData);
    let arr = [];

    _params.arr1.forEach((item1)=>{
        _params.arr2.forEach((item2)=>{ 
            if(item1.id==item2.id){
                if(filterArr1 && filterArr1.includes(item1.category)){
                    Object.assign(item1,item2);
                    if(mergeArr){
                        mergeArr.forEach((item3)=>{
                            if(item3.id==item1.id){
                                Object.assign(item1,item3);
                            }
                        })
                    }
                    arr.push(item1)
                }
            }
        })
    })
    
    return arr;
}
function setData(settings){
    let {config,commonData} = settings;
    let {path,params} = config;
    try {
        //支持表达式
        if(config.expression){
            params = JSON.parse(JSON.stringify(params))
            this.recu(params,(obj,closestObj)=>{
                Object.keys(obj).forEach((key)=>{
                    let value = obj[key];
                    if(typeof value == 'string' && value.indexOf('{')>-1){
                        value = this.calcCondition(value,commonData);
                        obj[key] = value
                    }
                })
            })
        }
    } catch (error) {
        console.error(error)
    }
    
    let data = commonData;
    let _params = this.getParams(params,commonData)
    let pathArr = path.split('.')
    let { isDisabledSetData } = config
    pathArr.forEach((item,index)=>{
        if(index==pathArr.length-1){
            let opData = {}
            Object.keys(_params).forEach((path)=>{
                if(data[item]['GET_' + path]) opData['GET_' + path] = data[item]['GET_' + path]
                opData[path] = _params[path]
                //组件禁用情况下，不赋值 start
                if (data[item]['GET_' + path] && data[item]['GET_' + path]()) {
                    let { config } = data[item]['GET_' + path]()
                   if (isDisabledSetData === false && config._disabled == true) {
                       return true
                   }
                }
                //组件禁用情况下，不赋值 end
                commonData.this.$set(data[item],path,_params[path])
            })

            setTimeout(()=>{
                if(config.isTriggerChange!==false){
                    triggerChange(opData,settings)
                }
            },0)
        }else{
            data = data[item]
        }
    })
}
//重置数据(不删除组件外字段)
function resetData(settings){
    let {config,commonData} = settings;
    let data = this.calcCondition('{' + config.path +'}',commonData)
    let redc = (obj)=>{
        for(let key in obj){
            //如果有组件引用
           if(obj['GET_' + key]){
               let fn = obj['GET_' + key]()
               if(fn && fn.setDefaultValue){
                   settings.triggerType = 'setData'
                   fn.setDefaultValue(true,true)
               }
            }
            if(obj[key] instanceof Object){
                redc(obj[key])
            }
        }
        // 18007351438
    }
    redc(data)
}
//重置数据(删除组件外字段)
function resetDataPure(settings){
    console.log('resetDataPure')
    let {config,commonData} = settings;
    let data = this.calcCondition('{' + config.path +'}',commonData)

    let redc = (obj)=>{
        for(let key in obj){
            //如果有组件引用
           if(obj['GET_' + key]){
               let fn = obj['GET_' + key]()
               if(fn && fn.setDefaultValue){
                   settings.triggerType = 'setData'
                   fn.setDefaultValue(true,true)
               }
               if(obj[key] instanceof Object){
                    redc(obj[key])
                }
            }else{
                delete obj[key]
            }

        }
    }
    redc(data)
    console.log(data)
}
//给组件设置数据
function setDataComponent(settings,data,_params){
    let {config,commonData} = settings;
    Object.keys(_params).forEach((path)=>{
        // data[path] = _params[path]
        commonData.this.$set(data,path,_params[path])
        // data[item][path] = _params[path]
    })

    setTimeout(()=>{
        triggerChange(data,settings)
    },0)
}
function setLocal(settings){
    let {config,commonData} = settings;
    localStorage.setItem(config.key,JSON.stringify(commonData[config.value]))
}
function setSession(settings){
    let {config,commonData} = settings;
    sessionStorage.setItem(config.key,JSON.stringify(commonData[config.value]))
}
function setStore(settings){
    let {config,commonData} = settings;
    store.state[config.key] = commonData[config.value]
}

function setLocal1(settings){
    let {config,commonData} = settings;
    let query = this.getParams(config.params,commonData)
    localStorage.setItem(config.key,JSON.stringify(query))
}

function getLocal(settings){
    let {config,commonData} = settings;

    let query = localStorage.getItem(config.key);
    query = JSON.parse(query)
    return query
}
function removeLocal(settings){
    let {config,commonData} = settings;
    localStorage.removeItem(config.key)
}
function goPage(settings){
    let {config,commonData} = settings;
    
    if(config.getUrl){
        window.open(config.getUrl(settings), config.target);
        return
    }
    const { type="push" } = config
    let query = this.getParams(config.query,commonData);

        if(config.target == '_blank'){ // 跳转新页面
            let configQuery = JSON.parse(JSON.stringify(config.query));
            let url = null,paramsArr = [],paramsPath={};
            configQuery.map((item,index) =>{
                if(item.isEval){
                    paramsArr.push(item);
                }else{
                    if(item.key == 'page')url = item.value;
                    if(item.key != 'page')paramsArr.push(item)
                }
                
            })
            paramsPath = this.getParams(paramsArr,commonData);
            url = '/?page=' + url;
            let routeData = router.resolve({ path: url, query: paramsPath });
            //当前应用路由路径
            
            if(config.routerPath && !config.appHost){
                config.appHost = config.routerPath
            }
            //如果打开其他应用
            if(config.appHost){
                
                let paramsObj = this.getParams(configQuery,commonData);
                let appHost = config.appHost;
                if(appHost.indexOf('{')>-1){
                    appHost = this.calcCondition(appHost,commonData)
                }
                let paramsStr = objToUrlParams(paramsObj);
                let _url = appHost;
                if(paramsStr){
                    _url = appHost + (appHost.indexOf('?')>-1 ? '&' : "?") +paramsStr
                }
                console.log(_url)
                window.open(_url, config.target);
            }
            //如果打开当前应用
            else{
                window.open(routeData.href, config.target);
            }

        }else{
            router[type]({
                query:query
            })
        }
}
function goUrlPage(settings){
    let {commonData,config} = settings;
    console.log(config)
    let url = commonData.query[config.queryKey];
    // return
    location.href = url
    console.log(settings)
}
function confirm(settings){
    let {config,commonData,_this,triggerType} = settings;
    if(triggerType=='clearValue' || triggerType=='setValue')return

    MessageBox.confirm(this.calcCondition(config.text,commonData), config.title || '提示', {
        showClose:config.showClose===undefined ? true : config.showClose,
        showCancelButton:config.showCancelButton===undefined ? true : config.showCancelButton,
        showConfirmButton:config.showConfirmButton===undefined ? true : config.showConfirmButton,
        confirmButtonText: config.confirmButtonText || '确定',
        cancelButtonText: config.cancelButtonText || '取消',
        modal: config.modal === false ? false : true,
        customClass: config.myClass || '',
        type: config.type || '',
        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                config.isAwaitClose && done()
                // await sleep(50)
                _this.linkAction({
                    config : config.ok,
                    commonData:commonData
                }).then(()=>{
                    done()

                }).catch(()=>{

                })
            } else {
                config.isAwaitClose && done()
                _this.linkAction({
                    config : config.cancel || {events:[]},
                    commonData:commonData
                }).then(()=>{
                    done()
                }).catch(()=>{

                })
            }
        }
    }).then(() => {

    }).catch(() => {

    });
}
function sleep(times) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), times)
    })
}
function autoDo(settings){
    let {config,commonData} = settings;
    setInterval(() => {
        let isAuto = this.calcCondition(config.autoConditions,commonData);
        if(isAuto){
            commonData.this.linkAction({
                commonData:commonData,
                config : config.cbEvent
            }).then((res)=>{
    
    
            }).catch(()=>{
    
            })
        } 
    }, 30000);
}
function ajax(settings){
    let {config,commonData,params} = settings;
    let api = config.api || config
    params = params || this.getParams(api.params,commonData)
    if(Array.isArray(api.params)){
        if(!params){
            return Promise.resolve({})
        }
    }
    return new Promise((resolve,reject)=>{

        let loadingInstance;
        if(config.showLoading){
            loadingInstance = Loading.service({});
        }
        if(!api.apiNum) {

        }
        _axios.ajax({
            type:api.type,
            apiType: api.appType,
            apiNum:api.apiNum,
            data:  params,
            _mockUrl:api._mockUrl,
            portalUrl:api.portalUrl,
            method:api.method
          }).then((res)=>{
            loadingInstance && loadingInstance.close();
            if(res.success){
                let r = res.result
                if(api.switchResult){
                    if(typeof api.switchResult == 'function'){
                        r = api.switchResult(r,{commonData})
                    }else{
                        Object.keys(api.switchResult).forEach((key)=>{
                            r[key] = r[api.switchResult[key]];
                            delete r[api.switchResult[key]]
                        })
                    }

                }
                resolve(r);
                if(config.successTip){
                    if(typeof config.successTip =='object'){
                        Message(Object.assign({type:"success"},config.successTip));
                    }else{
                        let successTip = config.successTip;
                        if(typeof successTip =='string' && successTip.indexOf('{')>-1){
                            successTip = this.calcCondition(successTip,commonData)
                        }
                        Message({
                            message: successTip,
                            type: 'success'
                        });
                    }
                }
            }else{
                reject(res)
                setTimeout(()=>{
                    if(config.errorEvent){
                        commonData.this.linkAction({
                            commonData:commonData,
                            config : config.errorEvent
                        }).then((res)=>{


                        }).catch(()=>{

                        })
                    }
                })



            }
        }).catch(err => {
            console.error(err)
        })
    })
}
function test(settings){
    try {
        console.log('free.test',settings.config.value)
    } catch (error) {
        
    }
    return {
        a:2
    }
}
//计算合同日期
function calcContract(settings){
    let {config,commonData} = settings;
    let moment = commonData.this.$moment
    let params = this.getParams(config.params,commonData);
    let {
        contractStartDate,//合同起始日期
        contractTimeLimit,//合同期限
        contractTimeLimitUnit,//合同期限（单位）
        isNeedProbationPeriod//是否开启试用期
    } = params;
    let contractEndDate;//合同起结束日期
    let probationPeriodDate = '';//试用期终止日期
    if(contractStartDate && contractTimeLimit && contractTimeLimitUnit){
        //合同开始日期前一天
        let beforeDay = moment(contractStartDate).add(-1,'days').dateCn()
        //如果按年计算
        if(contractTimeLimitUnit==1){
            contractEndDate = moment(beforeDay).add(contractTimeLimit,'years').dateCn()
        }
        //如果按月计算
        else{
            contractEndDate = moment(beforeDay).add(contractTimeLimit,'months').dateCn()
        }
        //如果开启试用期
        if(isNeedProbationPeriod){
            var monthCount = contractTimeLimit;
            if(contractTimeLimitUnit==1){
                monthCount = monthCount * 12
            }
            var month = 6;
            if(monthCount<=12){
                month = 1;
            }else if(monthCount>12 && monthCount<=24){
                month = 3;
            }

            probationPeriodDate = moment(beforeDay).add(month,'months').dateCn()
        }
    }
    return {
        contractEndDate,
        probationPeriodDate
    }
}

function keepAjax(settings) {
    let loadingInstance = Loading.service({});
    const { config } = settings
    const { api } = config
    return new Promise((resolve, reject) => {
        const ajax = () => this.ajax(settings).then(res => {
            if(res[api.submitKey] == api.submitValue) {
                loadingInstance.close()
                resolve(res)
            } else {
                if(config.showPercent){
                    loadingInstance.setText(res.executePercentage + '%')
                }
                setTimeout(() => {
                    if(res.failMessage) {
                        loadingInstance.close()
                        Message({
                            message: res.failMessage,
                            type: 'error'
                        });
                        reject()
                    } else {
                        ajax()
                    }
                }, 1000)
            }
        })
        ajax()
    })
}
function deepClone(obj,authArr,idKey) {
    idKey = idKey || 'authId'
    authArr = authArr || store.state.authArr || []
    let authIdArr = []
    authArr.forEach((item)=>{
        authIdArr.push(item.id || item)
    })
    var newobj = obj instanceof Array ? [] : {};
    let isArray = obj instanceof Array;
    let deleteCount = 0;
    // 1.for...in进入循环
    for (var k in obj) {
      //2.判断对象的第一个属性是否为数组或者对象，如果是，则进入递归
      let elem = obj[k]
      if (obj[k] instanceof Array) {
        newobj[k] = this.deepClone(obj[k],authArr,idKey)
      }
      else if (obj[k] instanceof Object && typeof obj[k] !='function') {
        let isShow = true;
        if(elem[idKey]){
            //业务权限
            if(isShow  && obj[k][idKey]){

                if(authIdArr.indexOf(Number(obj[k][idKey]))==-1){
                    deleteCount++
                    isShow = false
                }
            }
        }
        if(isShow){
            let num = k;
            if(isArray){
                num = num - deleteCount
            }
            newobj[num] = this.deepClone(obj[k],authArr,idKey)
        }
      }
      else {
        // 5.如果数据为基本类型，则直接赋值
        newobj[k] = obj[k]
      }
    }
    // 6.把存放了数据的新对象返回出去
    return newobj
}
function getUrlItem(key) {
    if (key == undefined) {
      var parseQueryString = function (url) {
        var reg_url = /^[^?]+\?([\w\W]+)$/,
          reg_para = /([^&=]+)=([\w\W]*?)(&|$)/g, //g is very important
          arr_url = reg_url.exec(url),
          ret = {};
        if (arr_url && arr_url[1]) {
          var str_para = arr_url[1], result;
          while ((result = reg_para.exec(str_para)) != null) {
            ret[result[1]] = result[2];
          }
        }
        return ret;
      }
      return parseQueryString(location.href)
    } else {
      var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
      var result = window.location.search.substr(1).match(reg);
      return result ? decodeURIComponent(result[2]) : null;
    }
  }

  //获取当前周第一天日期
  function getCurWeekFirstDay(){
      let curWeekday = moment().weekday()
      return moment().add(-curWeekday + 1, 'd').format('YYYY-MM-DD')
  }
  //获取当前周最后一天日期
  function getCurWeekLastDay(){
    let curWeekday = moment().weekday()
    return moment().add(-curWeekday + 7, 'd').format('YYYY-MM-DD')
  }
  //关闭当前窗口
  function closePage(settings) {
    let { config, commonData, params } = settings;
    let { message } = this.getParams(config.params, commonData);
    const close = () => window.close()
    message && MessageBox.confirm(message, '提示').then(res => {
    close()
    })
    !message && close()
  }
  //配置转成查看
  function configToView(config,isClone){
    if(isClone)config = JSON.parse(JSON.stringify(config))
    let redc = (obj,parentKey,parentObj)=>{
      if(!parentKey)parentKey = 'top'
       for(let key in obj){
         if(obj[key] instanceof Object){
           redc(obj[key],parentKey + '.' + key,obj)
         }else{
           if(key=='type'){
             if(['input','select','textarea','select-multiple','cascader','checkbox-multiple','date','month','year','rich-text','select-tree-multiple','cascader-multiple','switch'].includes(obj[key])){
               if(obj[key]=='textarea' || obj[key]=='rich-text' || obj[key]=='cascader-multiple'){
                 obj.span = 24
               }
               if(obj[key]=='rich-text'){
                 obj.childType = 'html'
               }
               obj.type='div-view'
               if(obj.label)obj.label+='：'
               if(parentKey=='table'){
                 obj.label = ''
               }
             }else{
               if(obj.disabled!==false)obj.disabled = true
             }
           }
         }
       }
   }
   redc(config)
   return config
  }
  //根据对象设置必填
  function objectSetRequired(settings){
    let { config, commonData,_this } = settings;
    let params = this.getParams(config.params,commonData);
    let _data = commonData.data;
    let path = config.path;
    if(path){
        let data = commonData;
        let pathArr = path.split('.')
        pathArr.forEach((item,index)=>{
            if(index==pathArr.length-1){
                _data = data[item]
            }else{
                data = data[item]
            }
        })
    }
    Object.keys(params).forEach((key)=>{
        if(!_data['GET_' + key] || !_data['GET_' + key]()){
            return
        }
        let $ref = _data['GET_' + key]();
        if($ref.config.required!==undefined && $ref.config.required_bak===undefined){
            $ref.config.required_bak = $ref.config.required;
        }
        if(typeof params[key] =='boolean'){
            $ref.config.required = params[key];
        }else{
            $ref.config.required = $ref.config.required_bak;
        }
    })
  }

  function message(settings){
    let {config,commonData} = settings;
    let _config = JSON.parse(JSON.stringify(config));
    _config.message = this.calcCondition(_config.message,commonData)
    Message(Object.assign({
        type:"success",
    },_config));
  }

  // 获取协议
  function getAgreement(settings) {
    let { config } = settings;
    const agreement = require(`./agreement/${config.agreement}`)
    return agreement[config.agreement]
  }
  //深度克隆对象
  function deepCloneObj(origin, target1) {
    var target = target1 || (Array.isArray(origin) ? [] : {});
    for(var prop in origin ){
      if(origin.hasOwnProperty(prop)){
          if(typeof origin[prop] =='function'){
            target[prop] = origin[prop];
          }
          else if(origin[prop] instanceof Array){
              target[prop] =[]
              this.deepCloneObj(origin[prop], target[prop]);
          }else if(origin[prop] instanceof Object){
              target[prop] ={}
              this.deepCloneObj(origin[prop], target[prop]);
          }
          else {
              target[prop] = origin[prop];
          }
      }
    }
    return target;
 }
 //对象深度合并
 function deepObjectMerge(firstObject, secondObject) {
    for (var key in secondObject) {
      firstObject[key] = firstObject[key] && Object.prototype.toString.call(firstObject[key]) === "[object Object]" ?
      this.deepObjectMerge(firstObject[key], secondObject[key]) : secondObject[key];
    }
    return firstObject;
  }
  //路由返回
  function routerBack(){
    router.back()
  }
  function setVar(settings){
    let {config} = settings;
    return config.value;
  }
  //列表导出select-multiple字符串转数组
function exportStrToNum(settings){
    let  {commonData,config} = settings;
    let params = this.getParams(config.params, commonData);
    try {
      params.conditions.forEach((item)=>{
        if(item._type=='select-multiple'){
          let value = item.value.map((item2)=>{
            return (Number(item2).toString() ==  "NaN") ? item2 :  Number(item2)
          })
          item.value = value
        }
      })
      return params
    } catch (error) {
      return params
    }
  }

  //加法
  function mathSum (a, b) {
    if (a == null) a = 0;
    if (b == null) b = 0;
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mathMul(a, e) + mathMul(b, e)) / e;
}
//乘法
function mathMul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) { }
    try {
        c += e.split(".")[1].length;
    } catch (f) { }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
// 时间转换
function fomatTime(valueTime){
    if (valueTime) {
        var myTime = new Date(valueTime).getTime()
        var newData = Date.parse(new Date());
        var diffTime = Math.abs(newData - myTime);
        if (diffTime > 7 * 24 * 3600 * 1000) {
            var date = new Date(myTime);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('1' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return m + '-' + d + ' ' + h + ':' + minute;
  
        } 
        else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
            //注释("一周之内");
            // var time = newData - diffTime;
            var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
            return dayNum + "天前";
  
        } 
        else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
            //注释("一天之内");
            // var time = newData - diffTime;
            var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
            return dayNum + "小时前";
  
        } else if (diffTime < 3600 * 1000 && diffTime > 0) {
            //注释("一小时之内");
            // var time = newData - diffTime;
            var dayNum = Math.floor(diffTime / (60 * 1000));
            if(dayNum==0)dayNum=1;
            return dayNum + "分钟前";
        }
    }
  }
  //延迟
  function delay(settings={}){
    let  {config} = settings;
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve()
        }, config.time || 300);
    })
  }
  function checkHasKeys(settings){
    let  {commonData,config} = settings;
    let params = this.getParams(config.params, commonData);
    if(!params.canotHideKeys) return true;
    let isPass = true,errTip='';
    if(params.canotHideKeys && params.canotHideKeys.length > 0 && params.colList && params.colList.length > 1){
        params.canotHideKeys.forEach(item1 => {
            if(item1.key && !params.colList.includes(item1.key)){
                isPass = false;
                errTip = item1.label + '不可隐藏'
                return 
            }
        })
    }
    if(!isPass){
        Message({
            message: errTip,
            type: 'error'
        });
    }
    return isPass
  }

  let free = {
    ENV:process.env.NODE_ENV,
    isFilter : false,
    checkHasKeys,
    fomatTime,
    mathSum,
    mathMul,
    getLocal,
    getParams,
    calcCondition,
    getOption,
    getOptionCommon,
    toTree,
    isUndefined,
    objToUrlParams,
    getToken,
    goBack,
    arrToArr,
    isAllEqual,
    isAllEqualValue,
    isHasValue,
    refreshCommonOption,
    openUrl,
    appendEvent,
    toGetParamsArr,
    toGetParams,
    recu,
    getAuthArr,
    strlen,
    setCommonData,
    setData,
    setLocal,
    goPage,
    confirm,
    ajax,
    test,
    setLocal1,
    getLocal,
    setDataComponent,
    calcContract,
    keepAjax,
    setStore,
    deepClone,
    getUrlItem,
    setSession,
    resetData,
    getCurWeekFirstDay,
    getCurWeekLastDay,
    closePage,
    configToView,
    clearOptionCache,
    objectSetRequired,
    goUrlPage,
    resetDataPure,
    axios : _axios,
    message,
    removeLocal,
    getAgreement,
    deepCloneObj,
    deepObjectMerge,
    routerBack,
    arrayObjecAssign:arrayObjecAssign,
    setVar,
    autoDo,
    exportStrToNum,
    delay
}
export default free;