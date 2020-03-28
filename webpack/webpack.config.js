const Path = require("path");
const HtmlWebpackPlagin = require("html-webpack-plugin");

module.exports = {
    entry: Path.resolve(__dirname, "../src/index.js"),
    output: {
        filename: 'bundle.[chunkhash].js',
        path: Path.resolve(__dirname, "../dist")
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlagin({
            template: Path.resolve(__dirname, "../index.html")
        })
    ]
};