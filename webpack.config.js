/* eslint-disable */
const path = require('path');

module.exports = {
    entry: ['whatwg-fetch', './src/index.js'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
        port: 18500,
        historyApiFallback: true,
    },
    devtool: 'source-map', // source-map
    // devtool: 'none',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }, {
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
            ]
        }, ]
    }
}