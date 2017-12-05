/*
 * @Author: yangtmm 
 * @Date: 2017-11-23 18:13:29 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-11-23 18:15:23
 */

var webpack = require("webpack");
var merge = require("webpack-merge");

var path = require("path");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

//引用公共包
var baseWebpackConfig = require("./npm-script/common.config");

module.exports = merge(baseWebpackConfig, {
    devtool: "cheap-module-eval-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new webpack.optimize.CommonsChunkPlugin(
            /* chunkName= */ "vendor",
            /* filename= */ "vendor.bundle.js"
        ),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10240
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": '"development"'
        })
    ],
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        devtool: "cheap-module-eval-source-map",
        hot: true,
        inline: true,
        port: 3000,
        host: "localhost"
    }
});
