const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true,
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/projects/': 'http://localhost:3000',
      '/users/': 'http://localhost:3000',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'BugTrackr',
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
