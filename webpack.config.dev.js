const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/componentes/index.jsx',
  output: {
    filename: 'js/[name].bundle[hash:6].js',
    chunkFilename: 'js/[name][chunkhash:6].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-'
    }
  },

  module: {
    rules: [
      {
        test: /\.(jsx?|es6)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      /* node_modules 引入的样式不需要模块化 */
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      /* 非 node_modules 样式模块化 */
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]-[hash:base64:4]'
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[local]-[hash:base64:4]'
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              fallback: 'file-loader',
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },

  devServer: {
    open: true,
    port: '8022',
    https: false,
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    historyApiFallback: true
  },

  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    extensions: ['.js', '.jsx', '.es6']
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'step-integrate',
      favicon: __dirname + '/favicon.ico',
      template: __dirname + '/index.html'
    }),
    new MiniCssExtractPlugin({ // 分离 css
      filename: 'css/[name][contenthash:6].css',
      chunkFilename: 'css/[id][contenthash:6].css' // 供应商(vendor)样式文件
    }),
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([ // 拷贝：原样输出
      {
        from: 'src/fonts/',
        to: 'fonts/[name].[ext]',
        type: 'template'
      },
      {
        from: 'src/css/',
        to: 'css/[name].[ext]',
        type: 'template'
      },
      {
        from: 'src/images/outer/',
        to: 'images/outer/[name].[ext]',
        type: 'template'
      }

    ])
  ]
}