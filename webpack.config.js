const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: "production",
    entry: ["./src/plugins/prevent-robot/jigsaw.js"],
    output: {
        // webpack 如何输出结果的相关选项
        path: path.resolve(__dirname, "test"), // string
        filename: "jigsaw.js",
        libraryTarget:'amd'
    },
    module: {
        rules: [
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