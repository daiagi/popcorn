const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
    mode: 'production',
    output: {
      filename: '[name].bundle.[contenthash].js',
      publicPath: '/dist/'
    },
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(
        {
          filename: '[name].[contenthash].css',
        },
      )
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            cssLoaderModulesRule,
          ],
          include: /\.module\.css$/,
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.s[ac]ss$/,
          include: /\.module\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            cssLoaderModulesRule,
            'sass-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/,
          exclude: /\.module\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        }
      ],
    },


    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
        new TerserPlugin({
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: true,
        }),
      ],
    },


  });
