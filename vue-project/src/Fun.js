let Component = {
  render:function(h){
    return h('div',this.msg1)
  },
  data(){
    return {
      msg:'Hello World'
    }
  }
}
Component.render._withStripped = true;
export default Component;