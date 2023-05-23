<template>
  <div class="free-button" :class="config.class" v-show="vShow">
    <!-- 按钮 -->
    <el-button
      :type="config.btnType"
      :size="config.size || 'mini'"
      :plain="typeof config.plain =='boolean' ? config.plain :  true"
      :loading="config.loading"
      :round="config.round"
      :disabled="disabled || isDisabled"
      @click="_click"
      class="wp100"
     >
     <!-- 图标 -->
     <i class="el-icon--left f15" :class="config.icon" v-show="config.icon"></i>
     <!-- 文字 -->
    {{text || config.text}}
    </el-button>
  </div>
</template>
<script>
  import component_mixins from './component_mixins'
  export default {
    name: 'free-button',
    props: ['settings'],
    mixins : [component_mixins],
    data() {
      return {
        vShow:true,
        text:"",
        disabled:false
      }
    },
    created(){
      this.component_init()
      let item = this.config;
      // ok 默认样式
      if(['确定','确认','提交','是','保存'].includes(item.text)){
        if(item.icon===undefined)item.icon='el-icon-check';
        if(item.btnType===undefined)item.btnType = 'primary'
        if(item.plain===undefined)item.plain = false
      }
      //cancel 默认样式
      if(['取消','否'].includes(item.text)){
        if(item.icon===undefined)item.icon='el-icon-close'
      }
    },
    methods:{
      _click(e){
        this.linkAction()
        if(this.config.stopPropagation)e.stopPropagation()
      },
      triggerClick(){
        this.linkAction()
      },
      //隐藏按钮
      hide(){
        this.vShow = false;
      },
      //显示按钮
      show(){
        this.vShow = true
      },
      //倒计时
      countDown(){
        let time = 60;
        this.t = setInterval(()=>{
          time--
          console.log(time)
          this.text = time +'s'
          if(time==0){
            clearInterval(this.t)
            this.text = '';
            this.disabled = false;
          }
        },1000)
        this.text = time +'s'
        this.disabled = true
      }
    }
  }
</script>
<style scoped lang="stylus">
 .delete  >>> .el-button.is-plain:focus, .delete >>>  .el-button.is-plain:hover,
 .delete >>> .el-button.is-active, .delete >>>  .el-button.is-plain:active{
    color: #ff4d61;
    border-color: #ffc6ca;
    background #ffe5e8;
  }

  .blue >>> .el-button{
    color: #fff;
    background: #4784F9;
    border none;
  }

  >>>.confirm .el-button.is-plain:focus, .confirm .el-button.is-plain:hover,
  >>>.confirm .el-button.is-active, .confirm .el-button.is-plain:active{
   opicity:0.8;
   color: rgba(255,255,255,.8);
   background: rgba(71,132,249,.8);
  }
  //mini按钮
  >>>.el-button--mini{
    padding:7px 15px;
    height 30px;
    box-sizing border-box
  }
  //危险按钮
  >>>.el-button--danger.is-plain{
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
  }
  >>>.el-button--danger.is-plain:hover{
    color: #F56C6C;
    background: #fef0f0;
    border-color: #fbc4c4;
  }
  >>>.iconfont{
    font-family:"iconfont" !important;
    font-size:14px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
