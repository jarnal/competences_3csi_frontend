/*eslint-disable no-console, no-var */
var express = require('express')
var rewrite = require('express-urlrewrite')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

var app = express()

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/',
  stats: {
    colors: true
  }
}))

app.use(express.static(__dirname))

app.listen(8080, function () {
  console.log('Serveur lancé sur http://localhost:8080, Ctrl+C pour arreter')
})
