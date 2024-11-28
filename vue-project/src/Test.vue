<template>
  <div>
    <el-input 
      @keyup.enter.native="()=>{}"
      clearable
    >
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: {
        msg: "Hello World",
      },
    };
  },
};
</script>