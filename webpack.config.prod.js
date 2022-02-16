const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const path = require("path")
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "auto",
        clean: true,
       
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
               
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                
                loader: "file-loader",
                options: {
                    limit: 50000
                }
            },
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.json']
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments:false,
                
            })
        ]
        
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
          
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
          }),
          new Dotenv({
            prefix:'process.env.',
            expand: true,
            ignoreStub: true,
            systemvars:true
        })
        
    ],
}