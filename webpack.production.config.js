/*
 * @Author: yangtmm 
 * @Date: 2017-11-23 18:13:36 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-11-24 10:22:39
 */

var webpack = require('webpack');
var merge = require('webpack-merge');

//打包成一样css文件插件
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var extractCSS = new ExtractTextPlugin('[name].min.css')

//提取公共部分js插件
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

//引用公共包
var baseWebpackConfig = require('./npm-script/common.config')

//自动填充css浏览器兼容前缀 -moz- -webkit-
var autoprefixer = require('autoprefixer');

//记录打包时间信息
var moment = require('moment')
var nowDateStr = moment().format("YYYY-MM-DD HH:mm:ss")


module.exports = merge(baseWebpackConfig, {
    devtool: 'cheap-module-source-map',
    postcss: [autoprefixer()],
    plugins: [
        //extractCSS, //生成独立文件插件，和module对应
        new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "vendor", /* filename= */ "vendor.bundle.js"),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            Redux: 'redux',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                screw_ie8: false
            },
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10240
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.BannerPlugin(`yonyou_cloud_crm \n update: ${nowDateStr}`),
    ]
})