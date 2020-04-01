const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const Path = require("path");
const config = require('./webpack.config');

module.exports = merge( config, {
    target: 'node',
    mode: "production",
    entry: Path.resolve(__dirname, "../src/server.js"),
    // This library creates an externals function that ignores node_modules when bundling in Webpack.
    externals: [nodeExternals()],
    output: {
        filename: 'server.js',
        path: Path.resolve(__dirname, "../dist"),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // for ignore css files
                    'null-loader'
                ],
            }
        ],
    },
});