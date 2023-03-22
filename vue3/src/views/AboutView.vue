<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted } from 'vue'

export default defineComponent({
  //setup整合了beforeCreate和created这两个api
  setup() {
    console.log("===setup===>"); 

    let arr: [string,number] = ['1',2];

    onBeforeMount(()=>{
      console.log("===onBeforeMount===>");
    })
    onMounted(()=>{
      console.log("===onMounted===>");
    })
    onBeforeUpdate(()=>{
      console.log("===onBeforeUpdate===>");
    })
    onUpdated(()=>{
      console.log("===onUpdated===>");
    })
    onBeforeUnmount(()=>{
      console.log("===onBeforeUnmount===>");
    })
    onUnmounted(()=>{
      console.log("===onUnmounted===>")
    })
  },
  beforeCreate(){
    console.log("===beforeCreate==>")
  },
  created(){
    console.log("===created==>")
  },
  beforeMount(){
    console.log("===beforeMount==>")
  },
  mounted(){
    console.log("===mounted==>")
  },
  beforeUpdate(){
    console.log("===beforeUpdate==>")
  },
  updated(){
    console.log("===updated==>")
  },
  beforeUnmount(){
    console.log("===beforeUnmount==>")
  },
  unmounted(){
    console.log("===unmounted==>")
  }
})
</script>


