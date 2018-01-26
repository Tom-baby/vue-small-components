/**
 * Created by chenjiajun on 2017/8/17.
 */
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');

let prodConfig = merge(baseConfig, {
	output: {
		/* 输出目录，没有则新建 */
		path: path.resolve(__dirname, '../dist'),
		/* 静态目录，可以直接从这里取文件 */
		publicPath: '/',
		/* 文件名 */
		filename: 'js/[name].[hash].js',
		chunkFilename: 'js/[name].[chunkhash].js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendors',
			filename:'js/[name].[hash].js'
		})
	]
});

module.exports = prodConfig;