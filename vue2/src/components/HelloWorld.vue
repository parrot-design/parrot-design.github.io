<template>
  <div class="hello">
    <div v-for="(value,key) in getKeys" :key="key">
      <div>{{value}}</div>
    </div>
    <button @click="addProperty">增加属性</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      dataObj:{
        a:1
      }
    }
  },
  computed:{
    getKeys:function(){
      return Object.keys(this.dataObj);
    }
  },
  methods:{
    addProperty:function(){
      this.dataObj.b=2;
      // console.log(this.dataObj)
      //this.$set(this.dataObj,'c',2);
      // this.$forceUpdate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
