var autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/components/react-validation/form-validator.js',
  output: {
    filename: './dist/index.js',
    sourceMapFilename: './dist/index.js.map',
    libraryTarget: 'umd'
  },
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: require('./config/babel.dev')
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
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
        loader: 'style!css?modules&camelCase&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:6]!resolve-url!autoprefixer!sass?outputStyle=expanded'
      },
      {
        test: /\.scss\?global$/,
        loader: 'style!css?sourceMap!resolve-url!autoprefixer!sass?outputStyle=expanded'
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  }
}
