<template>
  <div class="free-div" :style="config.style" :class="[
      getClass(),
      (config.direction=='col') ? 'free-div-col' : 'free-div-row'
  ]" @click="linkAction({
      config : config
    })">
    <span class="free-div-content"  v-if="(config.label || config.value || !$free.isUndefined(name)) && config.childType !='img'" >
      <!-- label -->
      <span class="free-div-label" v-if="config.showLabel!==false">{{getLabel()}}</span>
      <!-- value/html -->
      <span v-html="getValue2(config.value)" v-if="config.value && config.childType=='html'"></span>
      <!-- value -->
      <span v-text="getValue2(config.value)" v-else-if="config.value"></span>
      <!-- html -->
      <span :class="config.textClass" v-html="name" v-else-if="config.childType=='html'"></span>
      <!-- 文件 -->
      <div :class="config.textClass" v-else-if="config.childType=='file'">
        <a class="c4 f12 db" v-for="item in name" :key="item.id" :href="item.url" target="_balnk" v-show="name.length>0">{{item.name}}</a>
        <span v-show="name.length==0">{{config.emptyValue}}</span>
      </div>
      <!-- 文本-文件 -->
      <div :class="config.textClass" v-else-if="config.childType=='text-file'">
        <span class="bf1">{{name.content}}</span>
        <a class="c4 f12 db" v-for="item in name.fileList" :key="item.id" :href="item.url" target="_balnk">{{item.name}}</a>
      </div>
      <!-- text -->
      <span class="free-div-text" :class="config.textClass" v-text="name" v-else :title="config.showTitle ? name : ''"></span>
    </span>
    <!-- 后代元素 -->
    <free-g v-for="(item,index) in config.fieldList" :key="index" :settings="{
      config:item,
      data:data,
      topData:topData,
      parentData:parentData,
      parentConfig:parentConfig
    }" />
    <!-- 如果是表格编辑，需要开启校验 -->
    <ValidationProvider  :rules="getRuleConfig()" v-slot="{errors}" v-if="config.tableEdit">
      <input v-model="data[config.name]" v-show="false" />
      <div class="vee-error">{{config.showErrorText===false? "" : errors[0]}}</div>
    </ValidationProvider>
  </div>
</template>
<script>
  import component_mixins from './component_mixins'
  export default {
    name: 'free-div',
    props: ['settings'],
    mixins : [component_mixins],
    created() {
      this.component_init()
      //获取名称
      this.getName()
      //监听数据变化
      this.$watch('data.' + this.config.name, () => {
        //获取名称
        this.getName()
      })
    },
    data() {
      return {
        name :''
      }
    },
    methods:{
      // 获取二维数组name
      getArrArrName(){
        let {optionConfig,childType,options} = this.config;
        let commonData = this.getCommonData()
        let name = JSON.parse(JSON.stringify(this.data[this.config.name]))
        return this.$free.getOption(optionConfig,'',commonData).then((arr)=>{
            name.forEach((item,index)=>{
              name[index] = name[index].map((item2)=>{
                return arr.filter((item3)=>{
                  return item3.id == item2
                })[0].nameZhCn
              })
            })
            name = name.map((item)=>{
              return item.toString().split(',').join(this.config.textSeparator || '、')
            })
            return name.toString().split(',').join('、')
          })
      },
      //获取名称
      getName(){
        let {optionConfig,childType,options} = this.config;
        let name = this.data[this.config.name]
        // 如果是二维数组
        if(optionConfig && Array.isArray(name) && Array.isArray(name[0])){
          this.getArrArrName().then((res)=>{
            this.name = res;
          })
        }
        else if(optionConfig){
          if(this.$free.isUndefined(name))name = ''
          let nameIdArr = name.toString().split(',')
          let nameArr = []
          let commonData = this.getCommonData()
          this.$free.getOption(optionConfig,'',commonData).then((arr)=>{
            // if(this.config.name=="ownerCommercialInsurance")console.log(this.config)
            nameIdArr.forEach((nameId)=>{
              arr.forEach((item)=>{
                let _id = item.id;
                if(optionConfig=='_bool'){
                  _id = _id.toString()
                }
                if(_id==nameId){
                  if(_id===0){
                    if(nameId===0 || nameId==='0'){
                      nameArr.push(item.nameZhCn)
                    }
                  }else{
                    nameArr.push(item.nameZhCn)
                  } 
                }
              })
              if(this.config.textSeparator){
                this.name = nameArr.join(this.config.textSeparator)
              }else{
                this.name = nameArr.join('、')
              }
              //为空值显示
              if(this.name=='' && this.config.emptyValue){
                this.name = this.config.emptyValue
              }
            })

          })
        }else if(options){
          if(this.$free.isUndefined(name))name = ''
          let nameIdArr = name.toString().split(',')
          let nameArr = []
          let arr = options;
          nameIdArr.forEach((nameId)=>{
            arr.forEach((item)=>{
              let _id = item.id.toString();
              if(_id==nameId){
                nameArr.push(item.nameZhCn)
              }
            })
          })
          this.name = nameArr.join('、')
          //为空值显示
          if(this.name=='' && this.config.emptyValue){
            this.name = this.config.emptyValue
          }
        }else{
          this.name = name;
          //未空赋值（不是文件类型）
          if(this.config.emptyValue && this.config.childType!='file' && this.config.childType!='text-file'){
            if(this.name=='' && this.config.emptyValue)this.name = this.config.emptyValue
          }
          //文字-文件类型
          if(this.config.childType=='text-file'){
            if(this.name==''){
              this.name = {
                content:this.config.emptyValue ? this.config.emptyValue : '',
                fieldList:[]
              }
            }
          }
          //文本转换
          if(this.config.textSwitch){
            if(this.name==this.config.textSwitch[0]){
              this.name = this.config.textSwitch[1]
            }
          }
        }
        //自动获取名称
        if(this.config.autoGetName && this.data[this.config.name + 'Name']){
          this.name = this.data[this.config.name + 'Name']
        }
        if(this.config.hasDisplayFormat!==false && this.config.hasDisplayFormat!=='false'){
          //金额
          if(this.config.format === 'money' || this.config.formatType==3){
            this.formatType3()
          }
          //百分比
          else if(this.config.formatType === 6){
            this.name = this.toPercent(this.name,this.config.formatDefine ? this.config.formatDefine.decimalPlaces : 0);
          }
          //日期
          else if(this.config.format === 'datatime'){
            this.name = this.$free.fomatTime(this.name);
          }
        }
      },
      formatType3(){
        //替换
        if(this.config.formatDefine && this.config.formatDefine.transformDisplayValue){
          let {whenValue,transformDisplayValue} = this.config.formatDefine
          if(whenValue!==undefined){
            if(this.name===whenValue){
              this.name = transformDisplayValue
              return
            }
          }else{
            if(this.name==='' || this.name===null || this.name===0 || this.name===undefined){
              this.name = transformDisplayValue
              return
            }
          }
        }
        this.name = this.toMoney(this.name,this.config.formatDefine ? this.config.formatDefine.decimalPlaces : 2);
      },
      toPercent(v,len){
        function round(number,X){
          X = (X == null || X == undefined?2:X);
          return Math.round(number*Math.pow(10,X))/Math.pow(10,X);
        }
        return round(Number(v * 100),len)+'%'
      },
      //转化仟分位 v money 
      toMoney (v,len) {
        if(v===''){
          return ''
        }
        let split = ',';  //len 小数点长度 split 分割类型
        v = parseFloat((v + "").replace(/[^\d.-]/g, "")).toFixed(len) + "";
        return v.replace(/\d+/,function(v){
            var lit = v.length%3==0;
            var index = lit?v.length-3:-1;
            return v.split('').reverse().join('').replace(/\d{3}/g, function(k,l) {
                return k + ((l==index&&lit)?"":split);
            }).split('').reverse().join('')
          }
        );
      },
      //清空值
      clearValue(){
        this.data[this.config.name] = '';
        this.getName()
      },
      
      //获取表达式值
      getValue2(val) {
        let commonData = this.getCommonData()
        let value  = this.$free.calcCondition(val,commonData);
        if(this.config.format === 'money'){ 
            value = this.toMoney(value, this.config.formatDefine ? this.config.formatDefine.decimalPlaces : 2)
        }else if(this.config.format === 'datatime'){
          this.name = this.$free.fomatTime(this.name);
        }else if (this.config.amountInWords) {
          value = this.toAmountInWords(value);
        }
        //保留，未来使用
        // if(this.$free.isUndefined(value) && this.config.emptyValue){
        //   value = this.config.emptyValue
        // }
        return value
      },
      //金额转化大写
      toAmountInWords (n) {
        if(n==='')return ''
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
          return "数据非法";
        var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
          n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
          n = n.substring(0, p) + n.substr(p+1, 2);
          unit = unit.substr(unit.length - n.length);
        for (var i=0; i < n.length; i++)
          str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
      },
      //设置样式
      setStyle(settings){
        let {config,commonData} = settings;
        let params = this.$free.getParams(config.params,commonData)
        if(!this.config.style)this.config.style = {}
        Object.keys(params).forEach((key)=>{
          this.$set(this.config.style,key,params[key])
        })
      },
      getLabel() {
        const { config = {} } = this
        const { label = '' } = config
        let labelText = label.indexOf("{") > -1 ? this.$free.calcCondition(label, this.getCommonData()) : this.config.label
        return labelText
      },
      triggerClick(){
        this.linkAction({
          config : this.config
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  .free-div{
    word-break: break-all;
  }
  .free-div-col{
    >.free-div-content{
      flex-direction: column;
      display:flex
    }
  }
</style>
