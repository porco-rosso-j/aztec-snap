const path = require('path');
const { resolve } = require('path');
const { EsbuildPlugin } = require('esbuild-loader');
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.(cjs|js|mjs|jsx|ts|tsx)$/u,
        loader: 'esbuild-loader',
        options: {
          target: 'esnext',
          tsconfig: './tsconfig.json',
          sourcemap: true,
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              // Suppress warnings about named exports that don't exist
              svgo: false, // Disable svgo optimization (optional)
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    // path: resolve(dirname(fileURLToPath(import.meta.url)), './dest'),
    path: resolve(__dirname, 'dest'),
    filename: 'index.js',
  },
  plugins: [new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] })],
  resolve: {
    plugins: [new ResolveTypeScriptPlugin()],
    extensions: ['.ts', '.js', '.tsx', '.cjs', '.mjs', '.wasm'],
    alias: {
      './node/index.js': false,
      '@aztec/aztec.js': path.resolve(
        __dirname,
        '../../node_modules/@aztec/aztec.js/dest/index.js',
      ),
    },
    fallback: {
      crypto: false,
      os: false,
      fs: false,
      path: false,
      url: false,
      worker_threads: false,
      events: require.resolve('events/'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      string_decoder: require.resolve('string_decoder/'),
      tty: require.resolve('tty-browserify'),
    },
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },

  optimization: {
    minimizer: [
      new EsbuildPlugin({
        target: 'es2020', // Syntax to compile,
        css: true,
      }),
    ],
  },
};
