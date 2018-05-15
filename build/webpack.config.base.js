const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 编译的目标只是属于浏览器环境
  target: 'web',
  entry: {
    main: path.resolve(__dirname, '../client/main.js')
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'bundle.[hash:8].js'
    // publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpe?g|png|bmp|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'static/[path][name]-[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'client': path.join(__dirname, '../client'),
      'assets': path.join(__dirname, '../client/assets'),
      'layout': path.join(__dirname, '../client/layout'),
      'views': path.join(__dirname, '../client/views')
    }
  }
}

module.exports = config
