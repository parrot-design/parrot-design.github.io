class AnalysePlugin{
    constructor(){

    }
    apply(compiler){
        compiler.hooks.environment.tap('myPlugin',(params)=>{
            console.log("environment环境")
        }) 
    }
}

module.exports=AnalysePlugin;