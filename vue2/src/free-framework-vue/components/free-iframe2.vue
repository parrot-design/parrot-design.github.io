<template>
  <div :class="config.class" class="free-iframe2">
    <iframe width="100%" height='600px' border="0" frameborder="none" :src="getSrc()" ref="myref" ></iframe>
  </div>
</template>
<script>
import component_mixins from './component_mixins'
  export default {
    name: 'free-iframe2',
    props: ['settings'],
    mixins : [component_mixins],
    created() {
      this.component_init()
    },
    data() {
      return {
        init:false,
      }
    },
    methods:{
      getSrc(){
        let src='';
        let commonData = this.getCommonData()
        if(typeof this.config.src=='string'){
          src = this.$free.calcCondition(src,commonData);
        }else if(typeof this.config.src=='function'){
          src = this.config.src(commonData)
        }
        if(this.config.onlyContent){
          if(src.indexOf('?')>-1){
            src+='&onlyContent=true'
          }else{
            src+='?onlyContent=true'
          }
        }
        return src
      },
      sendIframeWindow(settings) {
        let {config,commonData} = settings
        let myDOM = this.$refs.myref
        let iframeWindow = myDOM.contentWindow

        if (config.params.key == 'id') {
          return new Promise((resolve, reject) =>{
            iframeWindow.postMessage(config.params.value, '*')

            window.addEventListener('message', (e) => {
              resolve(e.data)
            }, false);
          })
        } else if (config.params.key == 'cover') {
          let value = commonData.win.taskConfig.form[config.params.value]
          setTimeout(() => {
            iframeWindow.postMessage({key: value}, '*')
          }, 300)
          
        }
      },
      getContentVal(){
        return this.cron
      }
    },
  }
</script>
<style scoped lang="stylus">
  .free-iframe2{
    border:1px solid #ccc;

  }
</style>
