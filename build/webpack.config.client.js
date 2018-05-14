const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
let config
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': isDev ? '"development"' : '"production"'
    }
  })
]

if (isDev) {
  const devServer = {
    // 监听端口
    port: 9000,
    // ip地址
    host: '0.0.0.0',
    overlay: {
      // 显示错误信息
      errors: true
    },
    // 是否启用热加载 修改代码的时候不会刷新页面 就能显示修改的结果
    hot: true,
    open: true
  }
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: [
            'style-loader',
            'css-loader',
            /* css使用css module的配置
            {
                loader: 'css-loader',
                options: {
                    module: true,
                    localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
                }
            }, */
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      // main: path.join(__dirname, '..', 'src/main.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new webpack.HashedModuleIdsPlugin(),
      new HTMLPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'template.html'),
        chunks: ['runtime', 'vendor', 'main']
      }),
      new ExtractTextPlugin('styles.[contentHash:8].css'),
      // 提取vue库的代码出来到一个单独的文件
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // 提取webpack库的代码到单独一个文件
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      // 压缩脚本
      new UglifyJsPlugin()
    ])
  })
}

module.exports = config
