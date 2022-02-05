const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack')
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundled.js",
        publicPath: "/",
       
    },
    performance: {
      hints: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv({
            prefix:'process.env.',
            expand: true,
            ignoreStub: true,
            systemvars:true
        })
    ],
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                exclude: /node_modules/,
                type: "asset/inline",
            },
            {
                test:/\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: 'fonts/'
                    }
                }
            
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                    loader: "babel-loader",
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.html$/i,
               loader: "html-loader" ,
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".scss", ".json",".css"],
    },
    devServer: {

        static: path.resolve(__dirname, "public"),

        host:  process.env.HOST || "0.0.0.0",
        port: process.env.PORT ||  8080,

        allowedHosts: ["all"],
      

    },
};
