const outputFilePath = require('path');
module.exports = {
    entry: {
        index: ['babel-polyfill', './src/index.js'],
        edit: ['babel-polyfill', './src/edit.js']
    },
    output: {
        path: outputFilePath.resolve(__dirname, 'public/scripts'),
        filename: '[name]-bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: outputFilePath.resolve(__dirname, 'public'),
        publicPath: '/scripts/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    }
}