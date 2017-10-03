'use strict';

const webpack = require("webpack");
const path = require("path");
const PROD = (process.env.NODE_ENV === 'production');

module.exports = {
  context: __dirname + "/src",
  entry: PROD ? {"playkit-ott-analytics.min": "ott-analytics.js"} : {"playkit-ott-analytics": "ott-analytics.js"},
  output: {
    path: __dirname + "/dist",
    filename: '[name].js',
    library: "PlaykitJsOttAnalytics",
    libraryTarget: "umd",
    devtoolModuleFilenameTemplate: "./ott-analytics/[resource-path]",
  },
  devtool: 'source-map',
  plugins: PROD ? [new webpack.optimize.UglifyJsPlugin({sourceMap: true})] : [],
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: "babel-loader"
      }],
      exclude: [
        /node_modules/
      ]
    }, {
      test: /\.js$/,
      exclude: [
        /node_modules/
      ],
      enforce: 'pre',
      use: [{
        loader: 'eslint-loader',
        options: {
          rules: {
            semi: 0
          }
        }
      }]
    }]
  },
  devServer: {
    contentBase: __dirname + "/src"
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ]
  },
  externals: {
    "playkit-js": {
      commonjs: "playkit-js",
      commonjs2: "playkit-js",
      amd: "playkit-js",
      root: "Playkit"
    },
    "playkit-js-providers": {
      commonjs: "playkit-js-providers",
      commonjs2: "playkit-js-providers",
      amd: "playkit-js-providers",
      root: "PlaykitJsProviders"
    }
  }
};
