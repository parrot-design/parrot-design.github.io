let isInit = false;
let AV = {}
//初始化
function init(opts){
    if(isInit)return
    AV = require('leancloud-storage');
    AV.init(Object.assign({
        appId: "g6GvhM6Yjr1oKTXGVc4Hsu22-gzGzoHsz",
        appKey: "s6VvSUq077eqB9YP7JsLFvq9",
        serverURL: "https://g6gvhm6y.lc-cn-n1-shared.com"
    },opts));
    isInit = true
}
//新增
function mock_add(config,data,cb){
    const Todo = AV.Object.extend(config.apiNum);
    const todo = new Todo();
    Object.keys(data).forEach((key)=>{
      todo.set(key,   data[key]);
    })
    todo.save().then((todo) => {
      cb({
        "success": true,
        "errCode": 0,
        "errDes": null,
        "result":{}
      })
      console.log(`保存成功。objectId：${todo.id}`);
    }, () => {
  });
}
//更新
function mock_update(config,data,cb){
    const todo = AV.Object.createWithoutData(config.apiNum, data.objectId);
    Object.keys(data).forEach((key)=>{
        if(!['objectId','updatedAt','createdAt'].includes(key))todo.set(key,   data[key]);
    })
    todo.save().then((todo) => {
        cb({
        "success": true,
        "errCode": 0,
        "errDes": null,
        "result":{}
        })
        console.log(`保存成功。objectId：${todo.id}`);
    }, () => {
        
    });
}
//删除
function mock_delete(config,data,cb){
    const todo = AV.Object.createWithoutData(config.apiNum, data.objectId);
    todo.destroy().then((todo) => {
        cb({
        "success": true,
        "errCode": 0,
        "errDes": null,
        "result":{}
        })
        console.log(`保存成功。objectId：${todo.id}`);
    }, () => {
        
    });
}
  
//查询
function mock_get(config,data,cb){
    const query = new AV.Query(config.apiNum);
    console.log(data)
    Object.keys(data).forEach((key)=>{
        if(['page','rows','v'].includes(key))return;
        if(data[key]=='')return
        query.equalTo(key, data[key]);
        
    })
    query.descending('date');
    query.addDescending('plan_list_objectId');
    query.find().then((todo) => {
        cb({
        "success": true,
        "errCode": 0,
        "errDes": null,
        "result":JSON.parse(JSON.stringify(todo))
        })
    });
}
//查询
function mock_getOr(config,data,cb){
    let arr =[]
    Object.keys(data).forEach((key,index)=>{
      let query = null
      if(['page','rows','v'].includes(key))return;
      if(Array.isArray(data[key])){
        data[key].forEach((item)=>{
          query = new AV.Query(config.apiNum);
          query.equalTo(key,item);
          arr.push(query)
        })
      }
    })
    const query = AV.Query.or(...arr);
    query.find().then((todo) => {
      cb({
        "success": true,
        "errCode": 0,
        "errDes": null,
        "result":JSON.parse(JSON.stringify(todo))
      })
    });
  }
  export default {
    init,
    mock_add,
    mock_update,
    mock_delete,
    mock_get,
    mock_getOr
  }; 