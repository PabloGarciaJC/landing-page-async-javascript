const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/assets/main.js',  // tu JS principal
  output: {
    filename: 'bundle.js',         // JS compilado
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,          // Procesa CSS y SCSS
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.m?js$/,            // Procesa JS
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/pokemon-card-component') // incluye el paquete
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'] // transpila ES6+ a ES5 compatible
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ],
  mode: 'production',               // producción: minifica y optimiza
  devtool: 'source-map'             // opcional: mapas para depuración
};
