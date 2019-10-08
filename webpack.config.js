const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./client/index.js",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/react"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  }
}