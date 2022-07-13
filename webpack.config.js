const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")

const dist = path.resolve(__dirname, 'dist')

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].js',
        path: dist
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.html?$/,
                use: "html-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        })
    ],
    optimization: {
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                vendor: {
                    name() {return 'vendor'},
                    test: /[\\/]node_modules[\\/]/,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            }
        },
        minimize: true,
        minimizer: [new TerserWebpackPlugin()]
    }
}

if (process.env.NODE_ENV !== 'production') {
    module.exports.mode = 'development'
    module.exports.devtool = 'inline-source-map';
    module.exports.devServer = {
        static: { directory: dist},
        port: 3000
    }
}
