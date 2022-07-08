const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")

const dist = path.resolve(__dirname, 'dist')

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: dist
    },
    devServer: {
        static: { directory: dist},
        port: 3000
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                test: /\.html?$/,
                use: "html-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    "optimization": {
        minimize: true,
        minimizer: [new TerserWebpackPlugin()]
    }
}
