const path = require('path'); 
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//将webpack-dev-server打包的文件输出到磁盘
const WebpackDevServerOutput = require('webpack-dev-server-output');
const resolve = (dir) => path.join(__dirname, '../', dir);

module.exports = {
	mode: 'development', // 指定运行环境
	entry: {
		'app': resolve('src/index.jsx')
	},
  externals:{
  	'$'         :'window.jQuery',
  	'jquery'    :'window.jQuery'
  },
	output: {
		filename: 'js/[name].js',
		path: resolve('dist'),
    publicPath: '/dist/' 
	},
	resolve: {
		alias: {
			node_modules: resolve('node_modules'),
			lib: resolve('src/lib'),
			util: resolve('src/util'),
			component: resolve('src/component'),
			service: resolve('src/service'),
			page: resolve('src/page'),
		}
	},
	//配置开发环境服务器
	devServer: {
		//告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
		contentBase: resolve('dist'),
		//设置服务器的ip地址，可以为localhost
		host: 'localhost',
		//设置端口
		port: 8088,
		//设置自动拉起浏览器
		open: true,
		//设置热更新
		hot: true,
		inline: true,
    historyApiFallback: {
        index : '/dist/view/'
    },
		publicPath: '/dist/'
	},
	module: {
		rules: [
      {
				test: /\.(js|jsx)$/,
				exclude: resolve('node_modules'),
				loader: 'babel-loader',
				options: {
					plugins: ['react-hot-loader/babel'], // 热更新插件
					presets: ['@babel/preset-env', '@babel/preset-react'] // jsx转为js函数
				},
			},
			{
				test: /\.scss/, // 把scss转为webpack可识别的模块
				loaders: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							options: {},
						}
					},
					'sass-loader'
				]
			},
      //css-loader
      {
      	test: /\.css$/,
      	use: [
      		MiniCssExtractPlugin.loader,
      		"css-loader"
      	]
      },
			//处理图片、字体，url-loader
			{
				test: /\.(gif|png|jpg|jpeg|woff|svg|eot|ttf)\??.*$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 100,
						name: 'image/[name].[ext]'
					}
				}]
			}
		]
	},
	plugins: [
    //webpack 单独打包css，通过link的方式引入
    new MiniCssExtractPlugin({
    	filename: 'css/[name].css'
    }),

		//调用webpack的热更新插件
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
    
    //将webpack-dev-server打包的文件输出到指定位置
//     new WebpackDevServerOutput({
//     	path: resolve('dist'),
//     	//重新编译时删除之前的文件
//     	isDel: true
//     }),

		// html 加载
		new HtmlWebpackPlugin({
			filename: resolve('dist/view/index.html'),
			title: '后台管理系统',
			template: resolve('src/index.html'),
			inject: true,
			hash: true,
			// chunks: ['vendors', 'app'],
			chunks: ['app'],
			// script 标签的引用顺序
			// dependency按照不同文件的依赖关系来排序
			chunksSortMode: 'dependency',
			// 对 html 文件进行压缩
			minify: {
				// 去除引号
				removeAttributeQuotes: false,
				// 去除注释
				removeComments: true,
				// 去除空格
				collapseWhitespace: false
			}
		})
	]
}