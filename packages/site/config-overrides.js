const path = require('path');
const { resolve } = require('path');
const { EsbuildPlugin } = require('esbuild-loader');
// eslint-disable-next-line node/no-extraneous-require
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin');
const webpack = require('webpack');

module.exports = {
  // eslint-disable-next-line func-name-matching, no-unused-vars
  webpack: function override(config, env) {
    // config.target = 'web';
    // config.mode = 'development';
    // config.devtool = 'source-map';
    // config.entry = {
    //   main: './src/index.tsx',
    // };

    // config.output = {
    //   path: resolve(__dirname, 'dest'),
    //   publicPath: 'auto',
    //   scriptType: 'text/javascript',
    //   filename: 'index.js',
    // };

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
      // crypto: require.resolve('crypto-browserify'),
      // crypto: false,
      // os: false,
      // fs: false,
      // path: require.resolve('path'),
      // url: false,
      // assert: false,
      // worker_threads: false,
      // // eslint-disable-next-line node/no-extraneous-require
      // events: require.resolve('events/'),
      // buffer: require.resolve('buffer/'),
      // util: require.resolve('util/'),
      // // stream: require.resolve('stream-browserify'),
      // stream: false,
      // // eslint-disable-next-line node/no-extraneous-require
      // string_decoder: require.resolve('string_decoder/'),
      // // tty: require.resolve('tty-browserify'),
      // tty: false,
    };

    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        // process: 'process/browser.js',
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
        // filter out the  babel-loader
        // ...config.module.rules.filter((rule) => {
        //   return !rule.loader || !rule.loader.includes('babel-loader');
        // }),
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
