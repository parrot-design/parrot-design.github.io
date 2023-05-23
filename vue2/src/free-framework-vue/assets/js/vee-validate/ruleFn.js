let idCard = function(value){
  //该方法由佚名网友提供;
  var gets = value
  var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子;
  var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份 证验证位值，10代表X;

  if (gets.length == 15) {
      return isValidityBrithBy15IdCard(gets);
  }else if (gets.length == 18){
      var a_idCard = gets.split("");// 得到身份 证数组
      if (isValidityBrithBy18IdCard(gets)&&isTrueValidateCodeBy18IdCard(a_idCard)) {
          return true;
      }
      return false;
  }
  return false;

  function isTrueValidateCodeBy18IdCard(a_idCard) {
      var sum = 0; // 声明加权求和变量
      if (a_idCard[17].toLowerCase() == 'x') {
          a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
      }
      for ( var i = 0; i < 17; i++) {
          sum += Wi[i] * a_idCard[i];// 加权求和
      }
      let valCodePosition = sum % 11;// 得到验证码所位置
      if (a_idCard[17] == ValideCode[valCodePosition]) {
          return true;
      }
      return false;
  }

  function isValidityBrithBy18IdCard(idCard18){
      var year = idCard18.substring(6,10);
      var month = idCard18.substring(10,12);
      var day = idCard18.substring(12,14);
      var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
      // 这里用getFullYear()获取年份，避免千年虫问题
      if(temp_date.getFullYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){
          return false;
      }
      return true;
  }

  function isValidityBrithBy15IdCard(idCard15){
      var year =  idCard15.substring(6,8);
      var month = idCard15.substring(8,10);
      var day = idCard15.substring(10,12);
      var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
      // 对于老身份 证中的你年龄则不需考虑千年虫问题而使用getYear()方法
      if(temp_date.getYear()!=parseFloat(year) || temp_date.getMonth()!=parseFloat(month)-1 || temp_date.getDate()!=parseFloat(day)){
          return false;
      }
      return true;
  }
}
let _ruleFn = {
    // 相同值校验
    sameValue(settings){
      let {config,data,value} = settings;
      console.log(value)
      let isPass = true
      value.forEach((item,index)=>{
        value.forEach((item2,index2)=>{
          if(index!=index2){
            if(item.approverType == item2.approverType && item.approverChar == item2.approverChar){
                isPass = false; 
                return false;
            }
          }
        })
      })
      if(!isPass)return '审批人类型+审批人不能重复！'
      return true
    },
    samePwd(settings){
      let {config,data,value} = settings;
      let targetValue = data[config.rules.targetName];
      if(targetValue==value){
        return true;
      }
      return '两次密码必须相同'
    },
    sameCompany(settings){
      let {config,data,value} = settings;
      let targetValue = data[config.rules.targetName];
      if(targetValue==value){
        return true;
      }
      return '子公司的名称必须和开户名一致！'
    },
    idcard(settings){
      let {config,data,value} = settings;
      let isPass = idCard(value)
      if(isPass){
        return true;
      }else{
        return '格式不正确'
      }
    },
    isDeal(settings) {
      let {config,data,value} = settings;
      if(value === true){
        return true;
      }else{
        return config.errorMsg
      }
    },
    //下拉框限制值
    selectLimit(settings){
      let {config,data,value} = settings;
      if(value == config.limitValue){
        return config.limitMsg
      }else{
        return true;
      }
    },
    _base(settings){
      let {config,data,value} = settings;
      let f2 = new RegExp("^(\\-)?\\d+(\\.\\d{1,2})?$");
      if((f2.test(value) ||  value === '最高' || value === '最低') && (!isNaN(value) && value >0)){
        return true;
      }else{
        return '只能为大于0的2位小数或最高或最低'
      }
    }
  }
  export default _ruleFn;