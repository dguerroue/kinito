const path_root              = require('../modules/path-root');
const path                   = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin      = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path_root('resources/js/app.js')
  },
  output: {
    path: path_root('public'),
    filename: 'js/[name].[hash].js'
  },
  resolve: {
    extensions: ['.scss', '.css', '.js', '.json', '.vue'],
    alias: {
      _public: path.resolve(__dirname, '../public/'),
      _resources: path.resolve(__dirname, '../resources/')
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: [
        'js/main.*.js',
        'js/main.*.js.map',
        'css/main.*.css',
        'css/main.*.css.map'
      ]
    }),
    new HtmlWebpackPlugin({
      template: path_root('resources/views/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        loader: 'url-loader'
      }
    ]
  }
};
