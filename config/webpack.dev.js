const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig,
  {
    mode: 'development',
    devServer: {
      hot: true,
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {

          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
      ],
    },
  });
