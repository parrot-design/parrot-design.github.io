module.exports = (config)=>{
   config.cache=false;
   config.mode="development";
   config.devServer.host='0.0.0.0'
   console.log(config,"==>config")
   return config;
};