'use strict'
const VueLoaderPlugin   = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv            = require('dotenv-webpack');


module.exports = env => {
  return{
    mode: env.MODE || 'development',
    entry: [
      './src/app.js'
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              
            }
          ]
        },
        
        {
          test: /\.(svg|gif|png|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use:[{            
            loader  : 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'font/'
              }
            }
          ]
        },
        
      ],      
    },    
    optimization: {
      splitChunks: {
        chunks: 'all'
        
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        templateParameters: {
          'min': (env.MODE=='production' ? '.min' : '')
        },
        hash:true,
        template: './src/index.html'
      }),
      new Dotenv({path: `./env/${env.ENV_FILE}.env`})
    ]
  }
}