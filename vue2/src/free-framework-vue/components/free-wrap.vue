<template>
    <div class="free-wrap content border" :class="{'labelLine':config.labelLine,'inline':config.inline,'disabled':config.disabled,'noMargin':config.noMargin}" >
      <!-- label -->
      <div class="label df ac" 
        v-if="config.showLabel!==false" 
        :style="{width:!isNaN(config.labelWidth) ? config.labelWidth +'px' : config.labelWidth}"
      >
        <!-- 必填星号 -->
        <span class="star ml3 df" v-show="isRequired">*</span>
        <!-- label文字 -->
        <span class="text">{{getLabel()}}</span>
        <!-- 帮助提示 -->
        <el-tooltip class="item" effect="dark" v-if="config.titleHelp" placement="top">
          <div slot="content" class="w370" v-html="config.titleHelp"></div>
          <i class="el-icon-question ml3"></i>
        </el-tooltip>
        
        <!-- label提示 -->
        <span class="labelTip df ml10 c8 f12 bf1 w0">{{config.labelTip}}</span>
        <!-- 插槽 -->
        <free-g
          v-if="config.labelRightSlots"
          :settings="{
            config:config.labelRightSlots,
            data: data,
            topData:topData,
          }"
        />
      </div>
      <!-- 内容 -->
      <div class="bf1 inputWrap">
        <slot></slot>
      </div>
    </div>
</template>
<script>
  import component_mixins from './component_mixins'
  export default {
    name: 'free-wrap',
    props: ['settings'],
    mixins : [component_mixins],
    created() {
      this.component_init()
    },
    data() {
      return {
        result : '',
      }
    },
    methods:{
      //获取label
      getLabel() {
        const { config = {} } = this
        const { label = '' } = config
        let labelText = ''
        if(label.indexOf("{") > -1) {
          labelText = this.$free.calcCondition(label, this.getCommonData())
        } else {
          labelText = this.config.label
        }
        this.$nextTick(() => {
          this.$set(this.config, 'labelError', labelText)
        })
        return labelText
      }
    }
  }
</script>
<style scoped lang="stylus">
    .free-wrap{
      margin-bottom:20px;
      >>>.vee-error{
        position:absolute;
        bottom:-19px;
        left:0;
        font-size:12px;
        color:red;
        width:100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis
      }
    }
    .noMargin{
      margin-bottom:unset;
    }
    .inputWrap{
      position:relative
    }
    .label{
      position relative;
    }
    .labelLine{
      display:block;
      .label{
        width:100%;
        padding-bottom:10px;
        padding-top:10px;
      }
      .labelTip{
        font-size: 12px;
        color: rgba(31,31,32,.45);
        margin-left 10px;
      }
    }
    .inline{
      display:flex;
      align-items:center
    }
</style>
