const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');

const _resolveCache = new Map();
const resolve = (__path = '.') => {
  if (_resolveCache.has(__path)) {
    return _resolveCache.get(__path);
  }
  const resolved = path.resolve(__dirname, __path);
  if (fs.existsSync(resolved)) {
    const followed = fs.realpathSync(resolved);
    _resolveCache.set(__path, followed);
    return followed;
  }
  _resolveCache.set(__path, resolved);
  return resolved;
};

module.exports = {
  context: __dirname,
  entry: {
    tfs_sdk: ['./src/index.ts'],
    'tfs_sdk.min': ['./src/index.ts'],
  },
  output: {
    library: {
      name: 'TFSClient',
      type: 'umd',
      export: 'default',
    },
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        include: [resolve('src'), resolve('node_modules')],
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    hot: false,
    compress: true,
    port: 9001,
  },
  resolve: {
    modules: [resolve('src'), resolve('node_modules')],
    extensions: ['.ts', '.js'],
  },
};
