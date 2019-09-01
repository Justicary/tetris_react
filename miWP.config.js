let webpack = require('webpack');
let OpenBrowser = require('open-browser-webpack-plugin');
let HtmlWebpack = require('html-webpack-plugin');
let ExtractText = require('extract-text-webpack-plugin');
let precss = require('precss');
let autoprefixer = require('autoprefixer');
let CopyWebpack = require('copy-webpack-plugin');
let version  = require('./package.json').version;

let entrada = __dirname + '/src/index.js';

let salida = {
    archivo: 'pagina/[name]/index.js',
    pedazoArchivo: 'pedazo/[name].[chunkhash:5].chunk.js',
};

let devtool = 'source-map';

let eslint = { configFile: __dirname + './eslintrc.js', };

// Desarrollo
let desarrolloPlugins = [
    new CopyWebpack([
        {from: './src/resources/music/musica.mp3'},
        {from: './src/resources/css/inicial.css'},
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowser({ url: 'http://127.0.0.1:8080' }),
];
// Producción
let produccionPlugins = [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new CopyWebpack([
        {from: './src/resources/musica/musica.mp3'},
        {from: './src/resources/css/inicial.css'},        
    ]),
    new HtmlWebpack({ template: __dirname + '/servidor/index.tmpl.html' }),
];
// Exportaciones
module.exports = {
  eslint,
  entry: entrada,
  output: salida,
  devtool: devtool,
  devPlugins: desarrolloPlugins,
  productionPlugins: produccionPlugins,
  version,
};