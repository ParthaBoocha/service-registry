'use strict';

let path = require('path');

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', './web/app.jsx'],
  resolve: { extensions: ['.js', '.jsx'] },
  output: {
    path: path.join(__dirname, './web/build'),
    filename: 'client.bundle.js'
  },
  module: { rules: [{
    test: /\.(jsx|js)$/,
    exclude: /node_modules/,
    use: [{
      loader: 'babel-loader',
      options: { presets: ['stage-0', 'es2015-node6', 'react'] }
    }]
  }, {
    test: /\.css$/,
    use: ['style-loader', {
      loader: 'css-loader',
      options: {
        modules: true,
        camelCase: true
      }
    },
    'sass-loader']
  }] },
  devtool: 'source-map',
  watch: true
};
