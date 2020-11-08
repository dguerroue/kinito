const path_root = require('../modules/path-root');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path_root('resources'),
        use: 'babel-loader'
      },
      {
        test: /\.s?css/i,
        include: path_root('resources'),
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
});
