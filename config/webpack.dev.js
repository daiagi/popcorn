const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig,
    {
        mode: 'development',
        devServer: {
            hot: true,
        },
        devtool: 'inline-source-map',
        plugins: [
            new Dotenv()
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    mode: 'local',
                                    localIdentName: '[name]__[local]--[hash:base64:5]',
                                },
                            },
                        },
                    ],
                    include: /\.module\.css$/,
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ],
                    exclude: /\.module\.css$/,
                },
            ],
        },
    });
