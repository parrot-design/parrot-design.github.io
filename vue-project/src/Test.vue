<template>
  <Hello :test="1"   class="test" style="color:red"></Hello>
  <!-- <div :test="1" @click.native="test" class="test" style="color:red"></div> -->
</template>

<script> 

export default ({
  components:{
    Hello:{
      template:`<div>{{ test }}</div>`,
      mounted:function(){
        console.log("mounted==>",this.__proto__.constructor.options);
      },
      props:['test']
    },
  },
  mounted:function(){
    console.log("mounted==>",this.__proto__.constructor.options);
  }
})
</script>

 