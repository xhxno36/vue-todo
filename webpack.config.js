const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


const isDev = process.env.NODE_ENV === "development";

function resolve(url){
    return path.join(__dirname, url);
}

const config = {
    //编译的目标只是属于浏览器环境
    target: "web",
    entry: resolve('src/main.js'),
    output: {
        path: resolve('dist'),
        filename:'bundle.[hash:8].js'
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(gif|jpe?g|png|bmp)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            name: "[name]-[hash:7].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,                
                use: [
                    {
                        loader: "url-loader",
                        options: { 
                            limit: 10000,                          
                            name: "[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin({
            template: resolve('index.html')
        }),
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'src': resolve('src'),
            'common': resolve('src/common'),
            'components': resolve('src/components'),
            'api': resolve('src/api'),
            'base': resolve('src/base')
        }
    }
}

if(isDev) {
    //开发环境下的webpack-dev-server配置
    config.module.rules.push({
        test: /\.css$/,
        use:[
            'style-loader',
            'css-loader'
        ]
    },
    {
        test: /\.scss$/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'sass-loader'
        ]
    })

    //调试代码需要
    config.devtool = "#cheap-module-eval-source-map";

    //用于开发环境则配置webpack-dev-server
    config.devServer = {
        //监听端口
        port: 9000,
        //ip地址
        host: "0.0.0.0",
        overlay: {
            //显示错误信息
            errors: true
        },
        //是否启用热加载 修改代码的时候不会刷新页面 就能显示修改的结果
        hot: true,
        open: true
    }

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.entry = {
        app: resolve('src/main.js'),
        vendor: ['vue']
    };
    config.output.filename = '[name].[chunkHash:8].js';
    config.module.rules.push({
        test: /\.scss$/,
        use:ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [            
                'css-loader',
                {
                    loader:'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'sass-loader'
            ]  
        })
    });

    config.plugins.push(
        new ExtractTextPlugin('styles.[contentHash:8].css'),
        //提取vue库的代码出来到一个单独的文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        //提取webpack库的代码到单独一个文件
        new webpack.optimize.CommonsChunkPlugin({
            name:'runtime'
        }),
        //压缩脚本
        new UglifyJsPlugin()
    );
}

module.exports = config;