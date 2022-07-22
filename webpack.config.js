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
    // mode: process.env.NODE_ENV,
    mode: 'none',
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
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            cacheGroups: {
                vendor: {
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `vendor-${packageName.replace('@', '')}`;
                    },
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
        // minimize: true,
        // minimizer: [new TerserWebpackPlugin()],
        providedExports: true,
        usedExports: true,
        mangleExports: "deterministic",
    }
}

if (process.env.NODE_ENV !== 'production') {
    module.exports.devtool = 'inline-source-map';
    module.exports.devServer = {
        static: { directory: dist},
        port: 3000
    }
}
