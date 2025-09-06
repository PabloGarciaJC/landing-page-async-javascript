const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry: './src/assets/main.js', // tu JS principal
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.s?css$/, // Procesa CSS y SCSS
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.m?js$/, // Procesa JS
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
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html', // copia HTML a dist/
        filename: 'index.html'
      })
    ],
    devtool: isDev ? 'eval-source-map' : 'source-map', // más rápido en dev
    devServer: isDev
      ? {
          static: './dist',
          port: 3000,
          open: true
        }
      : undefined,
    mode: isDev ? 'development' : 'production'
  };
};
