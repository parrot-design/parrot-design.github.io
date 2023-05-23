<template>
  <div class="free-g-each" :class="config.class">
      {{config.labelName}}
      <free-g 
        v-for="(item,index) in config.fieldList" 
        :key="index" 
        :settings="{
          config:item,
          data:config.name ? data[config.name] : data,
          topData:topData,
          parentData:data,
          parentConfig:config
        }" 
      />
  </div>
</template>
<script>
  import component_mixins from './component_mixins'
  export default {
    name: 'free-g-each',
    props: ['settings'],
    mixins : [component_mixins],
    created(){
      this.component_init();
    }
  }
</script>
<style scoped lang="stylus">
  .free-filter{
    >.free-g{
      float:left
    }
  }
  .free-filter:after{
    content:".";display:block;height:0;clear:both;visibility:hidden;
  }
  .free-buttons{
    display:flex;
    margin-top:10px;
    justify-content:flex-end;
    >.free-g{
      margin-left:10px
    }
  }
</style>
