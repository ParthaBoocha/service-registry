'use strict';

let path = require('path');

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', './web/app.jsx', './web/styles/main.css'],
  resolve: { extensions: ['.js', '.jsx'] },
  output: {
    path: path.join(__dirname, './web/build'),
    filename: 'client.bundle.js'
  },
  module: { loaders: [{
    test: /\.(jsx|js)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: { presets: ['stage-0', 'es2015-node6', 'react'] }
  }, {
    test: /\.css$/, loader: 'style-loader!css-loader'
  }] },
  //   }, {
  //     test: /\.scss$/,
  //     use: ExtractTextPlugin.extract({
  //       fallback: 'style-loader',
  //       // resolve-url-loader may be chained before sass-loader if necessary
  //       use: ['css-loader', 'sass-loader']
  //     })
  //   }] },
  //   sassLoader: { data: '@import "' + path.resolve(__dirname, 'web/style/_theme.scss') + '";' },
  //   postcss: [
  //     require('autoprefixer')
  //   ],
  //   plugins: plugins,
  devtool: 'source-map',
  watch: true
};
