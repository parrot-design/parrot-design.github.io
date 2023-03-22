<template>
  <div class="home">
  <ref-demo-vue />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"; 
import RefDemoVue from "./RefDemo.vue"; 

@Options({
  components: { 
    RefDemoVue
  },
})
export default class HomeView extends Vue {}
</script>
