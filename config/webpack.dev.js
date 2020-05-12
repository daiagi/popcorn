const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

const cssLoaderModulesRule = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    modules: {
      mode: 'local',
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  },
};

module.exports = merge(commonConfig,
  {
    mode: 'development',
    output: {
      publicPath: '/'
    },
    devServer: {
      hot: true,
      historyApiFallback: true,
    },
    devtool: 'inline-source-map',
    plugins: [


    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          include: /\.module\.css$/,
          use: [
            'style-loader',
            cssLoaderModulesRule,
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/,
          include: /\.module\.scss$/,
          use: [
            'style-loader',
            cssLoaderModulesRule,
            'sass-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/,
          exclude: /\.module\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        }
      ],
    },
  });
