const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: "production",
    entry: ["./bower_components/validate/validate.js"],
    output: {
        // webpack 如何输出结果的相关选项
        path: path.resolve(__dirname, "static/dist/lib"), // string
        filename: "validate.js",
        libraryTarget:'amd'
    },
    module: {
        rules: [
            // 模块规则（配置 loader、解析器等选项）
            {
              test: /\.js?$/,
              loader: ["babel-loader",'es3ify-loader']
            }
        ]
    },
    optimization: {
        minimize: false
    },
    plugins: [
    ]
    
}