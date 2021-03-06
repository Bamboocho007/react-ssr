const Path = require("path");
const Webpack = require("webpack");
const merge = require('webpack-merge');
const HtmlWebpackPlagin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const config = require('./webpack.config');

module.exports = merge( config, {
    mode: "development",
    output: {
        filename: 'assets/js/bundle.[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.module\.s?css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    {
                        loader: 'style-loader',
                        options: {
                            esModule: true
                        }
                    },
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            sourceMap: true
                        }
                    },
                    // // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.s?css$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                exclude: /\.module\.s?css$/
            }
        ],
    },
    plugins: [
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlagin({
            template: Path.resolve(__dirname, "../index.html")
        }),
        new CopyPlugin([
            { from: Path.resolve(__dirname, "../src/assets"), to: Path.resolve(__dirname, "../dist/assets") }
        ]),
    ],
    devServer: {
        contentBase: Path.join(__dirname, '../dist'),
        compress: true,
        port: 9000,
        hot: true,
        historyApiFallback: true
    },
    devtool: "inline-source-map"
});