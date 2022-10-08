const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	target: 'node',
	mode: 'production',
	entry: {
		app: './src/app.js',
		bridge: './src/bridge.js',
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/precompiled',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					// Use `.swcrc` to configure swc
					loader: require.resolve('swc-loader'),
				},
			},
		],
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: '#!/usr/bin/env node',
			raw: true,
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				// parallel: false,
				terserOptions: {
					compress: {
						ecma: 2019,
					},
					mangle: false,
					format: {
						semicolons: false,
					},
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
				},
			}),
		],
	},
};
