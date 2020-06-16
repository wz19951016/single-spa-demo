/*
 * @Author: wangzhong
 * @Date: 2020-06-09 17:36:49
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-06-16 16:58:29
 * @FilePath: /single-spa-portal-example/portal/webpack.config.js
 */ 
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
        main: 'src/App.js',
        single: "src/portal.js"
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'release'),
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				use: {
                    loader: "babel-loader",
                    options: {
                        babelrc: false,
                        presets: [
                            require.resolve("@babel/preset-react"),
                            require.resolve("@babel/preset-env")
                        ],
                        plugins: [
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                }
			}
		],
	},
	node: {
		fs: 'empty'
	},
	resolve: {
		modules: [
			__dirname,
			'node_modules',
		],
	},
	plugins: [
        CopyWebpackPlugin([
            {from: path.resolve(__dirname, 'src/index.html')},
            {from: path.resolve(__dirname, 'src/style.css')},
            {from: path.resolve(__dirname, 'libs/system.js')},
        ]),
        new CleanWebpackPlugin(['release']),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "index.html"
        })
	],
	devtool: 'source-map',
	externals: [
	],
    mode: 'development',
    devServer: {
		contentBase: './release',
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
        },
		// Proxy config for development purposes. In production, you would configure you webserver to do something similar.
        proxy: {
            "/": {
                bypass: function(req, res, proxyOptions) {
                    return "index.html"
                }
            },
            "/app1": {
                target: "http://localhost:9001",
                pathRewrite: {"^/app1" : ""}
            },
            "/app2": {
                target: "http://localhost:9002",
                pathRewrite: {"^/app2" : ""}
            },
            "/app3": {
                target: "http://localhost:9003",
                pathRewrite: {"^/app3" : ""}
            },
            "/app4": {
                target: "http://localhost:9004",
                pathRewrite: {"^/app4" : ""}
            },
            "/app5": {
                target: "http://localhost:9005",
                pathRewrite: {"^/app5" : ""}
            },
            "/app6": {
                target: "http://localhost:8080",
                pathRewrite: {"^/app6" : ""}
            }
        }
    }
};
