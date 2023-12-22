const path = require('path');
const { EsbuildPlugin } = require('esbuild-loader');
// eslint-disable-next-line node/no-extraneous-require, import/no-extraneous-dependencies
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin');
const webpack = require('webpack');

module.exports = {
  // eslint-disable-next-line func-name-matching, no-unused-vars
  webpack: function override(config, env) {
    const loaders = config.resolve;
    loaders.fallback = {
      crypto: false,
      os: false,
      fs: false,
      path: false,
      url: false,
      events: false,
      worker_threads: false,
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      tty: require.resolve('tty-browserify'),
    };

    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ]);

    config.resolve = {
      plugins: [new ResolveTypeScriptPlugin()],
      extensions: ['.ts', '.js', '.jsx', '.tsx', '.cjs', '.mjs', '.wasm'],
      alias: {
        stream: false,
        crypto: false,
        tty: false,
        path: false,
        fs: false,
        './node/index.js': false,
        '@aztec/aztec.js': path.resolve(
          __dirname,
          '../../node_modules/@aztec/aztec.js/dest/index.js',
        ),
      },
    };

    config.module = {
      rules: [
        {
          test: /\.(cjs|js|mjs|jsx|ts|tsx)$/u,
          loader: 'esbuild-loader',
          exclude: /node_modules/u,
          options: {
            target: 'esnext',
            tsconfig: './tsconfig.json',
            sourcemap: true,
          },
        },
        {
          test: /\.svg$/u,
          use: ['@svgr/webpack'],
        },
        // {
        //   test: /\.css$/iu,
        //   use: ['style-loader', 'css-loader', 'postcss-loader'],
        // },
        // {
        //   test: /\.module\.scss$/u,
        //   use: [
        //     'style-loader',
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         modules: {
        //           localIdentName: '[local]_[hash:base64:5]',
        //         },
        //       },
        //     },
        //     'sass-loader',
        //   ],
        // },
      ],
    };

    config.optimization = {
      minimizer: [
        new EsbuildPlugin({
          target: 'esnext', // Syntax to compile,
          css: true,
        }),
      ],
    };

    return config;
  },
};
