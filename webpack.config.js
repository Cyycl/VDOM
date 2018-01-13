const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const os = require('os');

const ROOT = path.resolve(__dirname);
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ENV = process.env.node_env;

const CONFIG = {
  entry: {
    main: `${ROOT}/src/main.js`,
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=js'],
      },
    ],
  },
  plugins: [
    new HappyPack({
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      id: 'js',
      // cache: true,
      verbose: true,
    }),
    new HtmlWebpackPlugin(),
  ],
};

if (ENV === 'development') {
  CONFIG.devServer = {
    content: './',
    hot: true,
    headers: {
      'X-Custom-Header': 'yes',
      'Access-Control-Allow-Origin': '*',
    },
  };

  CONFIG.output = {
    path: `${__dirname}./dist`,
    fileName: `[name].js?v${new Date().getTime()}`,
  };

  CONFIG.plugins = CONFIG.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
  ]);
} else {
  CONFIG.output = {
    path: path.join(__dirname, '/build'),
    filename: `[name].js?v=${new Date().getTime()}`,
  };
}


module.exports = CONFIG;
