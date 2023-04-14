class AnalysePlugin{
    constructor(){

    }
    apply(compiler){
        console.log("==compiler==>",compiler);
    }
}

module.exports=AnalysePlugin;