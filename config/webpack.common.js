/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');


const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.resolve(projectRoot, 'src');
const distDir = path.resolve(projectRoot, 'dist');

module.exports = {
  entry: {
    app: path.resolve(srcDir, 'index.jsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: distDir,
  },


  plugins: [

    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(srcDir, 'index.html'),
      favicon: path.resolve(projectRoot, 'icons', 'favicon', 'favicon-32x32.png')

    }),
  ],
  resolve: { extensions: ['*', '.js', '.jsx'] },


  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: srcDir,
        loader: 'babel-loader',
      },

      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};
