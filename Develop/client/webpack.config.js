const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
     
    ],
    module: {
      rules: [
        {
          test: /\.css$/, // Regex for matching .css files
          use: ['style-loader', 'css-loader'] // Order matters. css-loader interprets and resolves imports in CSS. style-loader injects the CSS into the DOM.
        },
        {
          test: /\.js$/, // Match .js files
          exclude: /node_modules/, // Exclude the node_modules folder
          use: {
            loader: 'babel-loader', // Use babel-loader for transpiling JavaScript
            options: {
              presets: ['@babel/preset-env'] // Use the preset for latest ECMAScript features
            }
          }
        }
      ],
    },
  };
};
