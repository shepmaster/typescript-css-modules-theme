const webpack = require('webpack');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/,

        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "typings-for-css-modules-loader",
              options: {
                importLoaders: 1,
                namedExport: true,
                camelCase: true,
                localIdentName: '[name]__[local]-[hash:base64:5]',
                modules: true,
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [precss, autoprefixer];
                }
              }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin(),
    new ExtractTextPlugin('style.css'),
  ]
};
