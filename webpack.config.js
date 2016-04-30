var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

module.exports = {

  entry: './app.jsx',

  output: {
    path: __dirname + '/',
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.jsx?$/, exclude: /(node_modules)/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader : 'file-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' }
    ]
  }
}
