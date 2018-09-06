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