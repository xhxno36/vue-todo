const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
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
const devServer = {
  // 监听端口
  port: 8888,
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
  entry: path.join(__dirname, '../demo/index.js'),
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
  ]),
  resolve: {
    alias: {
      // 包含了所有内容 默认是使用runtime的版本 如果使用runtime的脚本 new vue里面无法直接写template 需要转换
      vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  }
})
module.exports = config
