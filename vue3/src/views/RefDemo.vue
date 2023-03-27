<template>
  <div class="about">
    <!-- <h1>{{nameRef}}-{{state.ageRef}}</h1> -->
    <h1>{{ageRef}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue'

export default defineComponent({ 
  setup() {
    // const ageRef=ref(2)//值类型 响应式
    // const nameRef=ref("双越")

    const state=reactive({
        age:20,
        name:'双越'
    });
 

    //将响应式对象 变成普通对象
    const stateAsRefs=toRefs(state);

    //每个属性都是ref对象  
    const {age:ageRef,name:nameRef}=stateAsRefs;

    return {
        ageRef,
        nameRef
    };

    // ageRef.value=27;
    // nameRef.value='单越'

    // setTimeout(()=>{
    //     ageRef.value=25;
    //     nameRef.value='双越A'
    // },1500)

    
  }  
})
</script>


