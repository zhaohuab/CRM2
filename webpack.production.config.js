//webpack.production.js
var webpack = require('webpack');
var path = require('path');

//提取公共部分js插件
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//打包成一样css文件插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name].min.css')

//自动填充css浏览器兼容前缀 -moz- -webkit-
var autoprefixer = require('autoprefixer');

//记录打包时间信息
var moment = require('moment')
var nowDateStr = moment().format("YYYY-MM-DD HH:mm:ss")

//修改antd.design主题文件
var theme = require('./theme.config.js')

const environments = {
    // 测试环境
    'btest1': '//172.20.18.154',  //172.20.18.154
    // 测试环境
    'btest2': '//172.20.18.155',  //172.20.18.155
    // 测试环境
    'btest3': '//10.6.250.52',  //10.6.250.52
};

const productionEnv = environments[process.env.npm_lifecycle_event];
console.log(productionEnv)

//打包之前先清理lib
require('./before-build.script');

//打包之前先清理lib
require('./before-build.script');

module.exports = {
    entry: {
        //main: __dirname + "/src/main.jsx", //入口文件
        main: ['babel-polyfill', './src/main.jsx'], //添加垫片，支持es6新的api， 如[].fill(), [].form();
        vendor: ['redux', 'react-redux', 'react-router', 'react-router-redux', 'redux-thunk']
    },
    output: {
        path: __dirname + '/lib',
        publicPath: `${productionEnv}/lib/`,
        filename: "[name].min.js", //打包后输出的文件名
        chunkFilename: '[id].[chunkhash:8].chunk.js'
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        immutable: 'Immutable'
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            components: path.join(__dirname, 'src/components'),
            reducers: path.join(__dirname, 'src/reducers'),
            store: path.join(__dirname, 'src/store'),
            routes: path.join(__dirname, 'src/routes'),
            assets: path.join(__dirname, 'src/assets'),
            utils: path.join(__dirname, 'src/utils'),
            api: path.join(__dirname, 'src/api')
        },
    },
    module: {
        loaders: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel"
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url?limit=8192',
            },
            {
                test: /\.css$/,
                loaders: ["style", "css"]
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]",
            },
            {
                test: /\.(less)$/,
                loaders: [
                    "style",
                    "css",
                    `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`,
                ]
            }
        ]
    },
    devtool: 'cheap-module-source-map',
    postcss: [autoprefixer()],
    plugins: [
        extractCSS, //生成独立文件插件，和module对应
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
}