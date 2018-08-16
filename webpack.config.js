"use strict";
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

// dev server host and port
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';

module.exports = {
  mode: "development",
  // entry to the compile JS
  // 'react-hot-loader/patch' is required for HMR
  entry: [
    'react-hot-loader/patch',
    './src/js/index.tsx',
  ],
  // we want source maps on dev builds
  devtool: 'source-map',
  // settings related to the output of the compilation
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, "dist"),
    filename: 'assets/js/main.js'
  },
  // change webpack default resolve
  resolve: {
    extensions: [".ts", ".tsx", '.js', '.jsx']
  },

  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.jsx?$/,
        exclude: ['node_modules'],
        include: [ path.resolve(__dirname, 'src') ],
        //issuer: { test, include, exclude },
        enforce: "pre",
        enforce: "post",
        loader: "babel-loader",
        options: {
          presets: ["env", "react", "stage-0"]
        },
        // options for the loader
      },
      {
        test: /\.tsx?$/,
        exclude: ['node_modules'],
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.jpg/,
        exclude: ['node_modules'], 
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  //browserslist in package.json
                  return [autoprefixer]
                },
                sourceMap:true
              }
            },
            {
              loader: 'sass-loader?sourceMap'
            }
          ]
        })
      },
    ],
  },
  // dev server and HMR configuration
  devServer: {
    contentBase: './dist',
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  // define and configure plugins
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'assets/css/style.css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      {from: 'src/img', to: 'assets/img'},
      {from: 'src/data', to: 'data'}
    ]),
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
      files: {
        css: ['style.css'],
        js: [ 'main.js'],
      }
    })
  ]
};
