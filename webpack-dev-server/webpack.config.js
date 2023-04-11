const path=require('path');
const HTMLWebpackPlugin=require('html-webpack-plugin');

module.exports={
    mode:'development',
    entry:'./src/index.js',  
    devServer:{ 
        hot:true, 
        port:9000
    },
    plugins:[
        new HTMLWebpackPlugin({
            template:"./index.html"
        })
    ],
}