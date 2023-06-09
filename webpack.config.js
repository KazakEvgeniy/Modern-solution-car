const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;


module.exports = {
	mode,
	target,
	devtool,
	devServer: {
		port: 3000,
		open: true,
		hot: true,
	},
	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'assets/[name][ext]',
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'src', 'index.html'),
		}),
		new HtmlWebpackPlugin({
			filename: 'marketing.html',
			template: path.resolve(__dirname, 'src/pages', 'marketing.html'),
		}),
		new HtmlWebpackPlugin({
			filename: 'accounting.html',
			template: path.resolve(__dirname, 'src/pages', 'accounting.html'),
		}),
		new HtmlWebpackPlugin({
			filename: 'spares.html',
			template: path.resolve(__dirname, 'src/pages', 'spares.html'),
		}),
		new HtmlWebpackPlugin({
			filename: 'stock.html',
			template: path.resolve(__dirname, 'src/pages', 'stock.html'),
		}),
		new HtmlWebpackPlugin({
			filename: 'purchase.html',
			template: path.resolve(__dirname, 'src/pages', 'purchase.html'),
		}),
		new HtmlWebpackPlugin({
			filename: 'delivery.html',
			template: path.resolve(__dirname, 'src/pages', 'delivery.html'),
		}),
		new HtmlWebpackPlugin({
			filename: 'analytics.html',
			template: path.resolve(__dirname, 'src/pages', 'analytics.html'),
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		// new CopyPlugin({
		//   patterns: [{ from: 'static', to: './' }],
		// }),
		new Dotenv({
			path: './.env', // load this now instead of the ones in '.env'
			// safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
			allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
			systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
			silent: true, // hide any errors
			defaults: false, // load '.env.defaults' as the default values if empty.
			prefix: 'import.meta.env.' // reference your env variables as 'import.meta.env.ENV_VAR'.
		})

	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-preset-env')],
							},
						},
					},
					'group-css-media-queries-loader',
					{
						loader: 'resolve-url-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.woff2?$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
			{
				test: /\.(jpe?g|png|webp|gif|svg)$/i,
				use: devMode
					? []
					: [
						{
							loader: 'image-webpack-loader',
							options: {
								mozjpeg: {
									progressive: true,
								},
								optipng: {
									enabled: false,
								},
								pngquant: {
									quality: [0.65, 0.9],
									speed: 4,
								},
								gifsicle: {
									interlaced: false,
								},
								webp: {
									quality: 75,
								},
							},
						},
					],
				type: 'asset/resource',
			},
			{
				test: /\.m?js$/i,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
};
