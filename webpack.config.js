const path = require('path');

module.exports = {
  mode: 'development',
  node: {
    fs: 'empty',
  },
  entry: ['./src/client/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
};
