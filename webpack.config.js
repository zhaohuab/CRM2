//webpack.config.js
var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//var HtmlWebpackPlugin = require('html-webpack-plugin'); //自动打开浏览器插件

//修改antd.design主题文件
var theme = require('./theme.config.js')

var hostIP = 'localhost';
var portNumber = '3000';

module.exports = {
	entry: {
		main: __dirname + "/src/main.jsx",  //入口文件
		vendor: ['redux', 'react-redux', 'react-router', 'react-router-redux', 'redux-thunk']
	},
	output: {
		path: __dirname + '/lib',
		//path: path.resolve(__dirname, "public"),
		publicPath: '//localhost:'+portNumber+'/lib',
		filename: "[name].min.js",   //打包后输出的文件名
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
            components: path.join(__dirname, 'src/components'),
            reducers: path.join(__dirname, 'src/reducers'),
            store: path.join(__dirname, 'src/store'),
            routes: path.join(__dirname, 'src/routes'),
			assets: path.join(__dirname, 'src/assets'),
			utils: path.join(__dirname, 'src/utils')
        },
    },
	module: {
		loaders:[
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel"
			},
			{
	            test: /\.(jpg|png|gif)$/,
	            loader: 'url',
	        },
			{
				test: /\.(less)$/,
				loaders:[
					"style",
					"css",
					`less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`,
				]
			}
		]
	},
	devtool: 'cheap-module-eval-source-map',
	plugins: [
	    new webpack.HotModuleReplacementPlugin(),                         //热加载插件
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
		new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 10240
        }),
		new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        })
    ],
	devServer: {
	    headers: {
            "Access-Control-Allow-Origin": "*"
        },
        devtool: 'cheap-module-eval-source-map',
        hot: true,
        inline: true,
        port: portNumber,
        host: hostIP
	}
}
