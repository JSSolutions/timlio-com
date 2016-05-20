import path from 'path';
import webpack from 'webpack';

const extensionPath = path.join(__dirname, '../chrome/extension/');

const baseDevConfig = () => ({
  devtool: 'inline-source-map',
  entry: {
    content: `${extensionPath}content/content.js`,
    background: `${extensionPath}background/background.js`,
    popup: `${extensionPath}popup/popup.js`
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, 
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
      ]
    }]
  }
});

const devConfig = baseDevConfig();

export default devConfig;