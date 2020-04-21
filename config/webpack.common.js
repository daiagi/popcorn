const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const projectRoot = path.resolve(__dirname, '..');
const srcDir = path.resolve(projectRoot, 'src');
const distDir = path.resolve(projectRoot, 'dist');

module.exports = {
    entry: {
      app: path.resolve(srcDir, "index.js"),
    },
    output: {
      filename: '[name].bundle.[contenthash].js',
      path: distDir,
    },

    plugins: [
      new htmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(srcDir, 'index.html'),
  
      })
      ],
    resolve: { extensions: ["*", ".js", ".jsx"] },
  
  
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          include: srcDir, 
          loader: "babel-loader"
        },

        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    }
  };