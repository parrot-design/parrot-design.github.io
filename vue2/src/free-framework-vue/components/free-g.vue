<template>
    <component
      class="free-g" :class="[
        config.class,
        'free-g-' + config.type,
        'col-' + config.span,
        config.flexWrap ? 'free-g-flex-wrap' : ''
      ]"
      :is="getCom(config)"
      :ref="config.name || config.free_id"
      :settings="settings"
      :key="key"
      v-show="config.isShowD===undefined || config.isShowD===true || isShowD"
      v-if="init && (config.isShow===undefined || config.isShow===true || isShow)"
    >
    </component>
</template>
<script>
  import component_mixins from './component_mixins'
  export default {
    name: 'free-g',
    props: ['settings'],
    mixins : [component_mixins],
    data(){
      return {
        key : '',
        init:false
      }
    },
    created(){
      this.component_init()
      let {config,data} = this;
      //后代元素宽度
      if(config.childSpan){
        config.fieldList.forEach((item)=>{
          //以下控件默认占一行
          if(['checkbox-multiple','table','upload','textarea','tabs','infinite-scroll','addRemove','dialog','filter','map','rich-text'].includes(item.type)){
            item.span = item.span || 24
          }else{
            item.span = item.span || config.childSpan;
          }
        })
      }
      let that = this
      //添加当前数据对应的组件引用
      if(config.name){
        Object.defineProperty(this.data,'GET_' + config.name,{
          value : function(){
            return that.$refs[config.name]
          },
          writable:true
        })
      }
      //如果是用id引用组件
      if(config.free_id){
        if(!this.topData.free_id){
          this.topData.free_id = {}
        }
        Object.defineProperty(this.topData.free_id,'GET_' + config.free_id,{
          value : function(){
            if(config.name)return that.$refs[config.name]
            return that.$refs[config.free_id]
          },
          writable:true
        })
      }
      //设置组件默认值
      this.setDefaultValue();
      //如果组件的事件需要模拟触发
      if(config.events && config.triggerEvent){
        if(typeof config.triggerEvent == 'string'){
          if(config.immediately){
            this.event(config.triggerEvent)
          }
          else{
            setTimeout(()=>{
              this.event(config.triggerEvent)
            })
          }
        }else{
          if(config.immediately){
            this.linkAction()
          }
          else{
            setTimeout(()=>{
              this.linkAction()
            })
          }
        }
        
      }
      //如果是最外层，替换后代元素变量
      if(this.config.name=='win'){
        this.replaceVar()
      }
      //如果需要开启查看模式
      if(this.config.viewChild){
        this.$free.configToView(this.config)
        // this.setView()
      }
      //初始化完成
      this.init = true
    },
    mounted(){
      let {config,data} = this;
      let that = this
      //监听数据变化
      if(this.config.name){
        this.$watch('data.' + this.config.name, (a,b) => {
          Object.defineProperty(this.data,'GET_' + config.name,{
            value : function(){
              return that.$refs[config.name]
            },
            writable:true
          })
          this.setDefaultValue(false)
        })
      }
    },
    computed:{
      //是否显示(dom不存在)
      isShow(){
        let commonData = this.getCommonData()
        return this.$free.calcCondition(this.config.isShow,commonData)
      },
      //是否显示(dom存在)
      isShowD(){
        let commonData = this.getCommonData()
        let isShowD = this.$free.calcCondition(this.config.isShowD,commonData);
        return isShowD
      },
    },
    methods:{
      //设置查看
      setView(){
        let redc = (obj,parentKey,parentObj)=>{
           if(!parentKey)parentKey = 'top'
            for(let key in obj){
              if(obj[key] instanceof Object){
                redc(obj[key],parentKey + '.' + key,obj)
              }else{
                if(key=='type'){
                  if(['autocomplete','input','select','textarea','select-multiple','cascader','checkbox-multiple','date','month','year','rich-text'].includes(obj[key])){
                    if(obj[key]=='textarea' || obj[key]=='rich-text'){
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
        redc(this.config)
      },
      //替换变量
      replaceVar(){
        let redc = (obj,parentKey)=>{
          if(!parentKey)parentKey = 'top'
          for(let key in obj){
            if(obj[key] instanceof Object){
              redc(obj[key],parentKey + '.' + key)
            }else{
              if(typeof obj[key] == 'string' && obj[key].indexOf('{{')!=-1){
                obj[key] = this.$free.calcCondition(obj[key],{
                  win : this.topData.win,
                  data : this.data,
                  query : this.$route.query
                })
              }
            }
          }
        }
        redc(this.config)
      },
      //获取组件
      getCom(config){
        let type = config.type;
        if(!type){
          return 'free-g-each'
        }else if(type=="datetime" || type == 'month'|| type == 'year'){
          return 'free-date'
        }else if(type=="monthrange"){
          return 'free-daterange'
        }else if(type=="textarea"){
          return 'free-input'
        }else if(type=="div-view"){
          return 'free-div'
        }else{
          return 'free-' + type
        }
      }
    },
  }
</script>
<style scoped lang="stylus">
  .free-g{
    >>>.nafree_text{
      padding-left 0
    }
    >>>.label{
      font-size 14px;
      min-height:20px;
      line-height 20px;
      margin-bottom:8px;
    }
    >>>.icon{
      margin-right:8px;
    }
    >>>.free-input,
    >>>.free-text-select,
    >>>.free-datetifree-picker2,
    >>>.free-select2,
    >>>.free-picker,
    >>>.free-map-position,
    >>>.free-picker .name{
      border:none;
      height 100%
    }
    >>>.name{
      height:100%
    }
    //必填星号
    >>>.star{
      color:#F94B42;
      margin-right:3px;
    }
    //表单
    >>>.van-cell{
      min-height 44px;
      padding-right 0
      padding-left 0
    }
    >>>.free-radio{
      display:block;
      padding-bottom:15px;
      padding-top:10px
    }
    >>>.is-invalid.failed  .el-input__inner{
      border:1px solid red;
    }
  }
  .free-g-flex-wrap{
    display: flex;
    flex-wrap: wrap;
    >div{
      float:none
    }
  }
  .sameLine{
    //label同行显示
    .free-wrap,.free-div{
      display:flex;
      >>>.label{
        width 100px;
        justify-content: flex-end;
        margin-bottom:0;
        font-size:13px;
        .labelTip{
          display:none  
        }
        margin-right:10px
      }
      >>>.inputWrap{
        align-items: center;
        display:flex;
        >span{
          flex:1
        }
      }
    }
  }
  wx(a, b = 1)
    a /24 * b
  for num in (1..24)
    .col-{num}{
      width:wx(100%,num);
      float:left;
      box-sizing border-box
    }
    
</style>
