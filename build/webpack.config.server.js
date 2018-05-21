const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const path = require('path')
const VueServerRender = require('vue-server-renderer/server-plugin')

const isDev = process.env.NODE_ENV === 'development'
let config
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': isDev ? '"development"' : '"production"'
    },
    'VUE_ENV': 'server'
  }),
  new VueServerRender()
]

config = merge(baseConfig, {
  target: 'node',
  devtool: '#source-map',
  entry: path.join(__dirname, '../client/main-server.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'main-server.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
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
    new ExtractTextPlugin('styles.[contentHash:8].css')
  ])
})
module.exports = config
