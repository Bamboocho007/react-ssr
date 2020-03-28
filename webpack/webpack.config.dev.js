const Path = require("path");
const Webpack = require("webpack");
const merge = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge( config, {
    mode: "development",
    output: {
        filename: 'bundle.[hash].js',
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
                            modules: true
                        }
                    },
                    // // Compiles Sass to CSS
                    'sass-loader',
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
                    'sass-loader',
                ],
                exclude: /\.module\.s?css$/
            }
        ],
    },
    plugins: [
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
        new Webpack.HotModuleReplacementPlugin()
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