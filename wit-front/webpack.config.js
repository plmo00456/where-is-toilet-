const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      // index.html에 output에서 만들어진 bundle.js를 적용하여, deploy에 새로운 html 파일 생성
      template: `./public/index.html`,

      // template에 해당하는 파일에 dotenv 사용을 위한 설정
      env: process.env,
    }),

    // dotenv 사용을 위한 설정
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ]
};