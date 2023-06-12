<template>
  <free-g 
    :settings="settings"
  />
</template>

<script> 
import settings from "./App";
import "reactivity"
export default {
  name: 'App',
  components: {
  },
  data(){
    return {
      settings
    }
  }
}
</script>

<style lang="scss">
//使用@import url会被识别成css
@import "./App.scss";
</style>
