const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
module.exports = {
 mode:'development',
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundled.js",
    publicPath: "/",
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: "./public/index.html"
      }),
      new webpack.HotModuleReplacementPlugin()
  ],
  devtool:'inline-source-map',
  module: {
    rules: [

        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            exclude: /node_modules/,
            type: 'asset/resource',
        },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
        }
        
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
          test: /\.html$/i,
          use: {loader:'html-loader'}
          
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx",".scss",".json"],
  },
  devServer: {
  
        static: path.resolve(__dirname, "public"),
       
        host:'0.0.0.0',
        port: 8080,
  
    allowedHosts:['localhost:3100'], // That solved it


    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
}