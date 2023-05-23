import free from './_free'
let getOption = {
  init(_api,_id,commonData){
    let api = this.getApi(_api);
    if(!this.isRrefreshCommonOption)this.setCommonOption()

    let {key} = api;
    let params = free.getParams(api.params,commonData)
    let cacheKey = api.appType + '_' + api.apiNum + '_' + JSON.stringify(params);
    //如果是固定缓存
    if(this.cache[key]){
      return Promise.resolve(this.getResult(this.cache[key],api,_id,commonData))
    }
    //如果有接口缓存
    else if(this.cache[cacheKey]){
      return Promise.resolve(this.getResult(this.cache[cacheKey],api,_id,commonData))
    }
    //如果正在请求
    else if(this.isLoading[cacheKey]){
      return new Promise((resolve,reject)=>{
        this.isLoading[cacheKey].then((result)=>{
          // debugger
          //如果需要缓存
          if(api.isCache!==false){
            this.cache[cacheKey] = result;
          }
          let r = this.getResult(result,api,_id,commonData)

          resolve(r)
          delete this.isLoading[cacheKey]
        }).catch(()=>{
          delete this.isLoading[cacheKey]
        })
      })

    }
    // debugger
    this.isLoading[cacheKey] = free.ajax({
      config:api,
      commonData:commonData
    })
    return this.init(_api,_id,commonData)
  },

  isLoading:{},
  getApi(api){
    if(typeof api == 'string'){
      api = {key:api}
    }
    if(!api.apiNum)api.apiNum='70500002';
    if(!api.appType)api.appType='bds';
    if(api.apiNum=='70500002' && !api.params){
      api.params = [
        {key:'params',value:[{type:api.key}]}
      ]
    }
    return Object.assign({},api)
  },
  getResult(result,api,_id,commonData){

    let {key} = api;
    let r = []
    if(result === null) return []
    if(JSON.stringify(result)=='{}'){
      result = []
    }
    // 设置result
    if(Array.isArray(result)){
      r =  result;
      r.forEach((item)=>{
        if(api && api.pidKey)item.pid = item[api.pidKey]
        if(api && api.idKey)item.id = item[api.idKey]
        if(api && api.nameKey)item.nameZhCn = item[api.nameKey]
      })
    }else{
      r = JSON.parse(JSON.stringify(result));
      if(key){
        if(key.indexOf('{')>-1){
          key = free.calcCondition(key,commonData)
        }
        key.toString().split('.').forEach(item => {
          r = r[item]
        });
      }

      r.forEach((item)=>{
        if(!item.nameZhCn)item.nameZhCn = item.name;
        if(api.idKey)item.id = item[api.idKey]
        if(api.nameKey)item.nameZhCn = item[api.nameKey]
      })
    }


    // 设置衍生参数
    if(!free.isUndefined(_id)){
      // 如果是二维
      if(Array.isArray(_id) && _id.length>0 && Array.isArray(_id[0])){
        let nameArr = _id.map((item)=>{
          return item.map((item2)=>{
            let name = ''
            r.forEach((item3)=>{
              if(item3.id.toString()==item2.toString()){
                name = item3.nameZhCn
              }
            })
            return name
          }).join('-')
        })
        return {
          name:nameArr.join('、'),
          idOrigin:_id
        }
      }else{
        let idArr = _id.toString().split(',');
        let curItem = []
        let idNameArr = [];
        let nameArr = []
  
        idArr.forEach((id)=>{
          r.forEach((item)=>{
            if(item.id.toString()==id.toString()){
              idNameArr.push(item.id);
              nameArr.push(item.nameZhCn);
              curItem.push(item)
            }
          })
        })
        if(curItem.length==1){
          curItem =  curItem[0]
        }
        return {
          curItem : curItem,
          id : idNameArr.join(','),
          name : nameArr.join(','),
          idOrigin:_id
        }
      }
    }
    return r
  },
  //刷新常量
  refreshCommonOption(){
    this.setCommonOption(true)
  },
  //设置常量
  setCommonOption(isRefresh){
    this.isRrefreshCommonOption = true;
    let setCache = (r)=>{
      Object.keys(r).forEach((key)=>{
        let params = {
          params : [
            {type:key}
          ]
        }
        let cacheKey = api.appType + '_' + api.apiNum + '_' + JSON.stringify(params);
        this.cache[cacheKey] = r[key]
      })
    }
    let api = {
        apiNum:70500002,
        appType:'bds',
        params:[
            {key:"params",value:[{"type":"commonAll"}]},

        ]
    }
    let storage = ''
    try {
      storage = JSON.parse(localStorage.getItem('free_commonSelect'));
    } catch (error) {

    }
    if(storage && isRefresh!==true){
      setCache(storage)
    }else{
      free.ajax({
        config:api,
      }).then((r)=>{
        localStorage.setItem('free_commonSelect',JSON.stringify(r))
        setCache(r)
      })
    }
  },
  //清除缓存
  clearCache(){
    this.cache = JSON.parse(JSON.stringify(this.cacheClone))
  },
  cache :{
    _bool : [
        {id:true,nameZhCn:'是'},
        {id:false,nameZhCn:'否'}
    ],
    _bool1 : [
      {id:1,nameZhCn:'是'},
      {id:2,nameZhCn:'否'}
    ],
    _ageGroup: [
      {id:'1',nameZhCn:'16-20'},
      {id:'2',nameZhCn:'21-25'},
      {id:'3',nameZhCn:'26-30'},
      {id:'4',nameZhCn:'31-40'},
      {id:'5',nameZhCn:'41-50'},
      {id:'6',nameZhCn:'50以上'}
    ],
    _gender: [
      {id:'0',nameZhCn:'不限'},
      {id:'1',nameZhCn:'男'},
      {id:'2',nameZhCn:'女'}
    ],
    _gender: [
      {id:'0',nameZhCn:'不限'},
      {id:'1',nameZhCn:'男'},
      {id:'2',nameZhCn:'女'}
    ],
    _interviewStatus:[
      {id:'1',nameZhCn:'通过'},
      {id:'2',nameZhCn:'拒绝'},
      {id:'3',nameZhCn:'淘汰'}
    ],
    _ageGroup: [
      {id:'1',nameZhCn:'16-20'},
      {id:'2',nameZhCn:'21-25'},
      {id:'3',nameZhCn:'26-30'},
      {id:'4',nameZhCn:'31-40'},
      {id:'5',nameZhCn:'41-50'},
      {id:'6',nameZhCn:'50以上'}
   ],
    _interviewStatus2:[
      {id:'1',nameZhCn:'待面试'},
      {id:'2',nameZhCn:'暂未接通'},
      {id:'3',nameZhCn:'淘汰简历'}
    ],
    _interViewFunStatus:[
      {id:'1',nameZhCn:'邀约'},
      {id:'2',nameZhCn:'推荐给PM'},
      {id:'3',nameZhCn:'推荐给客户'},
      {id:'4',nameZhCn:'客户面试'},
      {id:'5',nameZhCn:'offer'},
      {id:'6',nameZhCn:'入职'},
      {id:'7',nameZhCn:'离职'},
      {id:'8',nameZhCn:'淘汰'},
    ],
    _interViewRebackStatus:[
      {id:'1',nameZhCn:'反馈'},
      {id:'2',nameZhCn:'已反馈'},
    ],
    _policyType:[
      {id:'1',nameZhCn:'养老保险'},
      {id:'2',nameZhCn:'医疗保险'},
      {id:'3',nameZhCn:'失业保险'},
      {id:'4',nameZhCn:'工商保险'},
      {id:'5',nameZhCn:'生育保险'},
      {id:'6',nameZhCn:'公积金'},
      {id:'7',nameZhCn:'补充公积金'},
    ],
    _month:(()=>{
      let arr = [];
      for(let i=1;i<=12;i++){
        arr.push({
          id:i,
          nameZhCn:i+'月'
        })
      }
      return arr
    })()
    // _com:[
    //   {id:1,pid:null,nameZhCn:"上海佩琪信息技术有限公司"},
    //   {id:2,pid:1,nameZhCn:"员工1"},
    //   {id:3,pid:1,nameZhCn:"员工2"},
    //   {id:4,pid:1,nameZhCn:"员工3"},
    // ],
    // _banci:[
    //   {id:1,nameZhCn:"班次 默认班次09:00-18:00"},
    //   {id:2,nameZhCn:"班次 设置班次08:00-18:00"},
    //   {id:3,nameZhCn:"休息"},
    // ],
    // _week:[
    //   {id:1,nameZhCn:"星期一"},
    //   {id:2,nameZhCn:"星期二"},
    //   {id:3,nameZhCn:"星期三"},
    //   {id:4,nameZhCn:"星期四"},
    //   {id:5,nameZhCn:"星期五"},
    //   {id:6,nameZhCn:"星期六"},
    //   {id:0,nameZhCn:"星期日"},
    // ],
  }
}
getOption.cacheClone = JSON.parse(JSON.stringify(getOption.cache))
export default getOption