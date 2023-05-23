<template>
  <el-card :class="config.class">
    <free-g
      v-for="(item, index) in config.fieldList"
      :key="index"
      :settings="{
        config: item,
        data: config.name ? data[config.name] : data,
        topData: topData,
        parentData: data,
        parentConfig: config,
      }"
    />
  </el-card>
</template>
<script>
import component_mixins from "./component_mixins";
export default {
  name: "free-card",
  props: ["settings"],
  mixins: [component_mixins],
  created() {
    this.component_init();
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    _click(e) {
      this.linkAction({
        config: this.config,
      });
      if (this.config.stopPropagation) e.stopPropagation();
    },
    //点击事件
    click() {
      this.linkAction({ config: this.config });
    },
    //获取远程url
    getUrl() {
      let url = this.config.url;
      if (url.indexOf("{") > -1) {
        return this.$free.calcCondition(url, this.getCommonData());
      } else {
        return url;
      }
    },
    //获取本地图片
    getImg() {
      let img = this.config.img;
      if (img.indexOf("{") > -1) {
        return this.$free.calcCondition(img, this.getCommonData());
      } else {
        return this.config.img;
      }
    },
  },
};
</script>
<style scoped lang="stylus">
img{
  display:block;
}
.url{
  width:100%;
  display:block;
  height:100%
}
</style>
