var autoprefixer = require ('autoprefixer')
var ExtractTextPlugin = require ('extract-text-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require ('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin (require ('./webpack-isomorphic-tools'));

module.exports = {
  devtool: "cheap-source-map",
  entry: './src/index.js',
  output: {
    filename: './dist/index.js',
    sourceMapFilename: './dist/index.js.map',
    libraryTarget: 'umd'
  },
  plugins: [
    new ExtractTextPlugin ('./dist/[name].css', {allChunks: true}),
    webpackIsomorphicToolsPlugin
  ],
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: require ('./config/babel.dev')
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression ('images'),
        loader: 'url-loader?limit=10240'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:6]!autoprefixer'
      },
      {
        test: /\.css\?global$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract ('style', 'css?modules&camelCase&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:6]!resolve-url!autoprefixer!sass?outputStyle=expanded'),
      },
      {
        test: /\.scss\?global$/,
        loader: ExtractTextPlugin.extract ('style', 'style!css?sourceMap!resolve-url!autoprefixer!sass?outputStyle=expanded'),
      }
    ],
    resolve: {
      extensions: ['', '.js', '.json', '.jsx']
    }
  },

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
