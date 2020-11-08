const path_root = require('../modules/path-root');
const Webpack   = require('webpack');
const { merge } = require('webpack-merge');

const common    = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    inline: true,
    contentBase: path_root('public/'),
    port: 8000,
    clientLogLevel: 'silent'
  },
  resolve: {
    extensions: ['.js', '.scss', '.css']
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path_root('resources'),
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options : {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ] // end test styles
      }
    ]
  }
});
