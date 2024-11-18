<template>
  <div>
    <button @click="change">测试</button>
    <FunctionalList v-if="visible" />
  </div>
  
</template>

<script>
import FunctionalList from './Fun';

export default {
  components: {
    FunctionalList
  },
  data(){
    return {
      visible:true
    }
  },
  methods:{
    change:function(){
      this.visible = !this.visible;
    }
  }
};
</script>