var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  watch: true,
  entry: './src/app.js',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: { compact: true },
        exclude: '/node_modules/'
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { sourceMap: true }
        }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.min.css',
    }),
    new OptimizeCssAssetsPlugin({}),
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      template: './src/index.html',
      filename: 'index.html',
      path: path.resolve(__dirname, 'build'),
    })
  ],
}