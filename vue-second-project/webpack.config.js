//入口使用绝对路径,防止出错
//path是nodejs中的一个基本包,用来处理路径
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
//设置一个变量,来判断这个变量是不是true
const isDev = process.env.NODE_ENV === 'development';

//打包前端资源
//最终这个webpack会将index.js里面的所有数据转化为bundle.js,并且打包是所有浏览器中都可以直接运行的代码
const config = {
	target:"web",
	// 入口文件
	// path.join,就是把这个路径和后面的路径拼接到一起,形成一个绝对路径
	entry: path.join(__dirname,'src/index.js'),
	// 出口文件路径设置
	output:{
		filename: "bundle.[hash:8]js",
		// [hash]是文件的哈希值，用来打版本号的，[chunkhash]是模块的哈希值，同样可以放在模块的文件名中。
		path: path.join(__dirname,'dist')
	},
	module:{
		rules:[
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.jsx$/,
				loader: "babel-loader"
			},
			{
				test:/\.(gif|jpg|jpeg|png|svg)$/,
				use:[
					{
						loader:"url-loader",
						options:{
							limit:1024,
							// 输出的图片名称[name].[ext]名称+后缀
							name:"[name].[ext]"
						}
					}
				]
			}
		]
	},
	plugins:[
	//给webpack的时候来判断NODE_ENV,会根据不同的环境进行不同的打包,在开发环境中会有很多提示信息和功能,而在正式环境中这些代码不会被用到
		new webpack.DefinePlugin({
			'process.env':{
				//必须使用'"***"'
				NODE_ENV: isDev?'"development"':'"production"'
			}
		}),
		new HTMLPlugin()
	]
}

if(isDev){
	config.module.rules.push({
			test:/\.styl/,
			use:[
				'style-loader',
				'css-loader',
				{
					loader:"postcss-loader",
					options:{
						sourceMap:true
					}
				},
				'stylus-loader'
			]
	})
	//允许浏览器进行文档的调试
	config.devtool = "#cheap-module-eval-source-map",
	//这里这是webpack的一些命令
	config.devServer = {
		//设置域名和端口
		port:8000,
		host:'0.0.0.0',
		overlay:{
			error: true
		},
		//webpack --hot 启动热加载,
		hot: true
	},
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
}else{
	config.entry = {
		app: path.join(__dirname,'src/index.js'),
		vendor: ['vue']
	}
	config.output.filename ="[name].[chunkhash:8].js"
	config.module.rules.push({
			test:/\.styl/,
			use:ExtractPlugin.extract({
				fallback:'style-loader',
				use:[
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true
						}
					},
					"stylus-loader"
				]
			})
		})
		config.plugins.push(
			new ExtractPlugin('styles.[contentHash:8].css'),
			new webpack.optimize.CommonsChunkPlugin({
				name:'vendor'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name:"runtime"
			})
		)
}

module.exports = config;

/*这个项目是要用于开发环境和正式环境*/
/* 此外package中安插一行webpack脚本*/
/*  为什么要在这个地方写这个脚本,只要在这里调用webpack,那么它会调用项目里的webpack,如果我们在命令行调用webpack,那么它会调用全局的webpack*/
/* "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    添加"build":"webpack --config webpack.config.js"
  }*/
	// 此后运行 npm run dev
