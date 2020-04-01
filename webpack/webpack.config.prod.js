const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const config = require('./webpack.config');

module.exports = merge( config, {
    target: 'web',
    mode: "production",
    // This plugin uses terser to minify your JavaScript. Seems to better then uglify
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // loader for autoprefixer
                    'postcss-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            }
        ],
    },
    plugins: [
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        // Prepare compressed versions of assets to serve them with Content-Encoding.
        new CompressionPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        }),
        // Creates file which contain information about build
        new ManifestPlugin({
            isAsset: true
        })
    ]
});