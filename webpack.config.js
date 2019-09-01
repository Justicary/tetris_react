let configuracion = require('./miWP.config');
// Desarrollo
module.exports = {
    entry: configuracion.entry,
    output: {
        path: __dirname + '/servidor',
        filename: 'app.js',
    },
    plugins: configuracion.devPlugins,
    module: {
        rules: [
          {
            test: /\.less$/,
            loader: 'less-loader', // compila Less a CSS
          },
          {
            test: /\.(json)$/,
            exclude: /node_modules/,
            loader: 'json-loader',
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader!eslint-loader',
          },
          {
            test: /\.(?:png|jpg|gif)$/,
            loader: 'url-loader?limit=8192', // Menos de 8k, incrustado; más de 8k archivos generados.
          },
        ],
    },
};