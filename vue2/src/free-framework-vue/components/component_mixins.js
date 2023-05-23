
// import free from '@/assets/js/_free'
// import commonEvent from  '. /assets/js/_commonEvent'
export default{
  data() {
    return {}
  },
  mounted(){
    //如果是free-g，不处理
    if(this.$options && this.$options.name=='free-g'){
      return
    }
    //如果有初始化事件
    if(this.config.mountedEvents && this.config.mountedEventsAuto!==false){
      this.linkAction({
        config:{
          events : this.config.mountedEvents
        },
      })
    }
  },
  computed:{
    isDisabled(){
      let disabled = this.config.disabled
      if(this.$free.isUndefined(disabled))return false
      let _disabled
      if(disabled.toString().indexOf('{')==-1){
        _disabled = disabled;
      }
      _disabled = this.$free.calcCondition(this.config.disabled,{
        win : this.topData.win,
        data : this.data,
        query : this.$route.query
      })
      this.config._disabled = _disabled
      return _disabled
    },
    isRequired(){
      let required = this.config.required
      if(this.$free.isUndefined(required))return false

      if(required.toString().indexOf('{')==-1){
        return required;
      }
      let result =  this.$free.calcCondition(this.config.required,{
        win : this.topData.win,
        data : this.data,
        query : this.$route.query
      })
      return result;
    },
    _getConfig(){


      return this.config
    },
  },
  methods : {
    getValue(){ 
      return this.data[this.config.name];

    },
    getData(){
      return this.data
    },
    event(eventName){
      if(this.config.events && this.config.events[eventName]){
        this.linkAction({type:eventName})
      }
    },
    setDefaultValue(isDefaultValue,isResetValue){
      let {config,data} = this;
      //组件类型
      let type = this.config.type; 
      if(!config.name)return;
      //设置配置里的默认值
      let setConfigDefaultValue = ()=>{
        if(config.defaultValue && typeof config.defaultValue == 'string' && config.defaultValue.indexOf("{") > -1 ) {
          this.$set(this.data,this.config.name, eval(config.defaultValue))
        } else {
          this.$set(this.data,this.config.name, config.defaultValue)
        }
        setTimeout(()=>{
          let com = this.data['GET_' + this.config.name]()
          if(com && com.change)com.change({
            triggerType:"setData"
          })
        })
      }
      //设置组件的默认值
      let setDefaultValue = ()=>{
        if(['map','autocomplete','input','input-new','input-table','select','time','date','radio','datetime', 'month', 'year','button','checkbox','div','switch','textarea','div-view','text','rich-text','select-tree'].includes(type)){
          this.$set(this.data,this.config.name,'')
        }else if(['timeline','upload','table','infinite-scroll','checkbox-multiple','cascader','cascader-multiple','select-multiple','select-tree-multiple','checkbox-multiple', 'div-each', 'addRemove', 'daterange','monthrange','tree','checkbox-diy','checkbox-diy2','tag','transfer','transfer2'].includes(type)){

          this.$set(this.data,this.config.name,[])
        } else if (['rate','steps','progress','input-number'].includes(type)) {
          this.$set(this.data,this.config.name, 0)

        }else{
          this.$set(this.data,this.config.name,{})
        }
      }
      //如果config设置了默认值  && 开启了设置默认值选项 && （当前组件值未定义 || 需要重置组件值）
      if(
        !this.$free.isUndefined(config.defaultValue) &&
        isDefaultValue!==false &&
        (this.$free.isUndefined(data[config.name]) || isResetValue)
      ){
        //设置config默认值
        setConfigDefaultValue()
      }
      //如果当前组件值未定义 || （需要重置组件值 && config的默认值为设置）
      if(this.$free.isUndefined(data[config.name]) || (isResetValue && !config.defaultValue)){
        //设置组件默认值
        setDefaultValue();
      }
    },
    component_init(){
      this.config = this.settings.config;
      if(this.config.required===undefined){
        this.$set(this.config,'required',false)
      }
      this.data = this.settings.data;
      this.topData = this.settings.topData;
      this.parentData = this.settings.parentData;
      this.parentConfig = this.settings.parentConfig;
    },
    triggerMountedEvents(){
      this.linkAction({
        config:{
          events : this.config.mountedEvents
        },
      })
    },
    //联动
    linkAction(settings){
      if(!settings) settings = {}
      let {config,commonData,type,triggerType} = settings || {};
      let _config = config || this.config;
      //如果事件未定义
      if(this.$free.isUndefined(_config.events)){
        return Promise.resolve();
      }
      this.commonData = this.getCommonData()

      Object.assign(this.commonData,commonData)
      let _commonData = this.commonData
      let _events = type ? _config.events[type] : _config.events;
      if(typeof _events =='function'){
        _events();
        return Promise.resolve();
      }
      else if(Array.isArray(_events)){
        // let e = JSON.parse(JSON.stringify(_events))
        let e = this.$free.deepCloneObj(_events)
        let events = [];
        e.forEach((item)=>{
          events.push(item);
          if(item.event=='free.appendEvent'){
            // debugger
            // let appendEvent = commonEvent[item.eventType](item)
            // appendEvent.forEach((item2)=>{
            //   events.push(item2)
            // })
          }
        })
        let goEvent = async ()=> {
            for(let i=0;i<events.length;i++){
              let _this = _commonData;
              let _thisFn = null
              let link = events[i];
              //控制条件，不满足则跳过该事件
              if(link.condition){
                let isGO = this.$free.calcCondition(link.condition,this.commonData);
                if(!isGO){
                  continue
                }
              }
              let {event} = link;
              let eventIsFunction = typeof event == 'function';
              if(eventIsFunction)_thisFn=event;
              let eventArr = eventIsFunction ? [] : event.split('.')
              eventArr.forEach((event,index)=>{
                //如果是获取父级组件
                if(event=='parentRef'){
                  if(index==0){
                    _this = _this.this.parentRef()
                  }else{
                    _this = _this.parentRef()
                  }
                  return
                }
                //如果是获取父级数据
                if(event=='parentData'){
                  let isFind = false;

                  if(index==0){
                    _this = _this.this.parentData
                  }
                  //如果当前是组件
                  else if(_this.$root){
                    _this = _this.parentData
                  }else{
                    Object.keys(_this).forEach((key)=>{
                      if(isFind)return;
                      if(_this['GET_'+key]){
                        isFind = true;
                        _this = _this['GET_'+key]().parentData
                      }
                    })
                  }
                  return
                }
                if(index== eventArr.length-1)return
                if(index== eventArr.length-2 && Array.isArray(_this)){
                  let thisArr = [];
                  _this.forEach((item)=>{
                    thisArr.push(item['GET_' +event]())
                  })
                  _this = thisArr

                }else if(index== eventArr.length-2 && _this['GET_'+event]){
                  _this = _this['GET_'+event]()
                }else{
                  _this = _this[event]
                }
              })
              let curEvent  = events[i]
              let fn;
              if(typeof _thisFn =='function'){
                fn = _thisFn({ 
                  config : curEvent,
                  commonData:_commonData,
                  _this:this,
                  triggerType : triggerType,
                })
              }else if(Array.isArray(_this)){
                fn = new Promise((resolve)=>{
                  _this.forEach((item)=>{
                    item[eventArr[eventArr.length-1]]({
                      config : curEvent,

                      commonData:_commonData,
                      _this:this,
                      // triggerConfig:config,
                      triggerType : triggerType,
                      // triggerTypeArr:settings.triggerTypeArr
                    })
                  })
                  resolve()
                })
              }else if(_this===undefined){
                fn = function(){}
              }else{
                fn = _this[eventArr[eventArr.length-1]]({
                  config : curEvent,
                  commonData:_commonData,
                  _this:this,
                  // triggerConfig:config,
                  triggerType : triggerType,
                  // triggerTypeArr:settings.triggerTypeArr
                })
              }
              if(fn instanceof Promise){
                let isBreak = false;
                await fn.then((res)=>{
                  if(curEvent.commonDatakey){
                    _commonData[curEvent.commonDatakey] = res;
                  }
                })
                //错误
                .catch((res)=>{
                  if(curEvent.commonDatakey && curEvent.errorEvent){
                    _commonData[curEvent.commonDatakey] = res;
                  }
                  isBreak = true
                })
                if(isBreak)break;
              }else{
                await fn;
                _commonData[curEvent.commonDatakey] = fn;
              }
            }
        }
        return goEvent()
      }
    },

    setValue(settings){
      let {config,commonData,triggerType} = settings;
      if(triggerType!='setData'){
        let value = this.$free.calcCondition(config.value,commonData)
        this.$set(this.data,this.config.name,value)
        settings.triggerType = 'setValue'
        if(this.change)this.change(settings)
        // this.data[this.config.name] = value
      }

    },
    parentRef(){


      let ref = this.parentData['GET_' + this.parentConfig.name]();


      return ref;

    },
    getConfig(){
      return this.config
    },
    setConfig(settings){
      let {config,commonData} = settings; 
      config.params.forEach((item)=>{
        item.value = this.$free.calcCondition(item.value,commonData)
      })
      config.params.forEach((item)=>{
        this.$set(this.config,item.key,item.value)
        // this.config[item.key] = item.value
      })
    },
    setData(settings){
      let {config,commonData} = settings;
      let params = this.$free.getParams(config.params,commonData);
      this.$free.setDataComponent(settings,this.data[this.config.name],params)

    },
    //刷新组件
    refreshComponent(){
      this.$parent.key = new Date().getTime()
    },
    getCommonData(){
      let commonData = {
        data:this.data,
        parentData:this.parentData,
        parentConfig:this.parentConfig,
        free:this.$free,
        query:this.$route.query,
        this:this,
        // triggerTypeArr : this.triggerTypeArr
      }
      try {
        let user = JSON.parse(localStorage.getItem('user'));
        commonData._user = user;
      } catch (error) {
        console.log(error);
      }
      Object.keys(this.topData).forEach((key)=>{
        commonData[key] = this.topData[key];
        if(this.topData['GET_' + key]){
          Object.defineProperty(commonData,'GET_' + key,{
            value : ()=>{
              return this.topData['GET_' + key]()
            },
            writable:true
          })
        }
      })
      return commonData
    },
    getClass(){
      let cls = this.config.class
      if(!cls)return cls;
      // debugger
      if(cls.indexOf("{") > -1){
        return this.$free.calcCondition(cls, this.getCommonData())
      } else {
        return cls
      }
    },
    getRuleConfig(){
      return {required :{config : this.config, data: this.data}}
    },
    //校验
    valid(){
      return new Promise((resolve,reject)=>{
        this.$refs.validate.validate().then(success => {
          let errors = this.$refs.validate.errors;
          let error = ''
          Object.keys(errors).forEach((key)=>{
            if(!error && errors[key].length>0){
              error = errors[key][0]
            }
          })
          if(success){
            resolve()
          }else{
            this.$message.error(error);
            console.log('%c' + error + '......o(*￣▽￣*)o','color:#f56c6c;')
            reject(error)
          }
        })
      })
    },
  }
}