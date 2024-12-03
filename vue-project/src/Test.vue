<template>
  <div>
    <!-- 根据 textContent 的值渲染内容 -->
    <div v-if="textContent">{{ textContent }}</div>
    <button @click="clearText">clearText</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textContent: 'Hello, world!', // 初始为包含文本
    };
  },
  methods: {
    clearText() {
      // 将 textContent 清空
      this.textContent = '';
    }
  }
};
</script>