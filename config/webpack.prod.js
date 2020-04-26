const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common.js');


module.exports = merge(commonConfig,
    {
        mode: 'production',
        output: {
            filename: '[name].bundle.[contenthash].js',
        },
        devtool: 'source-map',
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin(
                {
                    filename: '[name].[contenthash].css',
                },
            ),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: true,
                            },
                        },
                    ],
                },
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
