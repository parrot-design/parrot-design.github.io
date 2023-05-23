<template>
  <div :class="config.class">
    <free-g class="hp100 b0 bs10" v-if="init" :settings="{
        config:config2,
        data:data,
        topData:data
      }"  />
  </div>
</template>
<script>
import component_mixins from './component_mixins'
  export default {
    name: 'free-iframe',
    props: ['settings'],
    mixins : [component_mixins],
    created() {
      this.component_init()
      this.getPage()
    },
    data() {
      return {
        config2:{},
        init:false,
      }
    },
    methods:{
      //获取页面
      getPage(){
        this.$free.axios
        .ajax({
          method:'get',
          finalUrl:this.config.page +'.js'
        })
        .then((res) => {
          this.config2 = this.$free.deepClone(res.result)
          this.init = true;
        }).catch((res)=>{
          console.error(res)
        })
      }
    },
  }
</script>
<style scoped lang="stylus">
  img{
    display:block
  }
</style>
