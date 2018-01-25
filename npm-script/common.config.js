/*
 * @Author: yangtmm 
 * @Date: 2017-11-23 18:11:59 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-11-23 18:18:11
 */

var path = require('path');
//修改antd.design主题文件
var theme = require('./theme.config.js')


const environments = {
	//本地开发
	'dev': '//localhost:3000',
	// 测试环境
	'btest': '//172.20.18.154',
	// 正式环境
	'bup': '//172.20.18.155',
};



const productionEnv = environments[process.env.npm_lifecycle_event];

const publicPath = productionEnv + '/lib/';

//打包之前先清理lib
if (process.env.npm_lifecycle_event == "btest" || process.env.npm_lifecycle_event == "bup") {
	require('./before.build.script');
}

console.log(path.resolve(__dirname, '../lib'))
module.exports = {
	entry: {
		//main: __dirname + "/src/main.jsx", //入口文件
		main: ['babel-polyfill', path.resolve(__dirname, '../src/main.jsx')], //添加垫片，支持es6新的api， 如[].fill(), [].form();
		vendor: ['redux', 'react-redux', 'react-router', 'react-router-redux', 'redux-thunk']
	},
	output: {
		path: path.resolve(__dirname, '../lib'),
		publicPath: publicPath,
		filename: "[name].min.js", //打包后输出的文件名
		chunkFilename: '[id].chunk.js'
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		immutable: 'Immutable'
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
		alias: {
			components: path.join(__dirname, '../src/components'),
			reducers: path.join(__dirname, '../src/reducers'),
			store: path.join(__dirname, '../src/store'),
			routes: path.join(__dirname, '../src/routes'),
			assets: path.join(__dirname, '../src/assets'),
			utils: path.join(__dirname, '../src/utils'),
			api: path.join(__dirname, '../src/api')
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
	}
}