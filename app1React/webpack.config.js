/*
 * @Author: wangzhong
 * @Date: 2020-06-09 17:36:49
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-06-18 18:12:11
 * @FilePath: /single-spa-portal-example/app1React/webpack.config.js
 */ 
const path = require('path');

module.exports = {
    entry: {
        singleSpaEntry: './src/singleSpaEntry.js',
        store: './src/store.js'
    },
    resolve: {
        alias: {
            "static": path.resolve(__dirname, "assets")
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'release'),
        libraryTarget: 'amd',
        library: 'reactApp',
        publicPath: "http://localhost:9001/"
    },

    module: {
        rules: [
            {
                test: /\.js/,
                use: ['babel-loader?cacheDirectory'],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/app1/',
                            outputPath: "/app1"
                        }
                    }
                ]
            }
        ],
    },

    mode: 'development',

    devtool: 'eval-source-map',
    // devtool: 'none',
    devServer: {
        port: 9001,
        host: '0.0.0.0',
        contentBase: './release',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
};
