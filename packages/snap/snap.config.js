const path = require('path');
const { dirname, resolve } = require('path');
const { merge } = require('@metamask/snaps-cli');
const { EsbuildPlugin } = require('esbuild-loader');
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin');
const webpack = require('webpack');

module.exports = {
  bundler: 'webpack',
  sourceMap: true,
  evaluate: true,
  input: './src/index.ts',
  manifest: {
    path: './snap.manifest.json',
    update: true,
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  server: {
    enabled: true,
    port: 8081,
  },
  experimental: {
    wasm: true,
  },
  environment: {
    NODE_DEBUG: false,
    NODE_ENV: 'production',
    DEBUG: false,
  },
  stats: {
    verbose: false,
    builtIns: false,
  },
  polyfills: {
    process: true,
    buffer: true,
    stream: true,
    tty: true,
  },

  // eslint-disable-next-line @typescript-eslint/no-shadow
  customizeWebpackConfig: (config) =>
    merge(config, {
      module: {
        rules: [
          {
            test: /\.(cjs|js|mjs|ts)$/u,
            loader: 'esbuild-loader',
            options: {
              target: 'esnext',
              tsconfig: './tsconfig.json',
              sourcemap: true,
            },
          },
        ],
      },

      target: 'web',
      mode: 'production',

      resolve: {
        plugins: [new ResolveTypeScriptPlugin()],
        extensions: ['.ts', '.js', '.cjs', '.mjs', '.wasm'],
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
          events: false,
          worker_threads: false,
          buffer: require.resolve('buffer/'),
          util: require.resolve('util/'),
          stream: require.resolve('stream-browserify'),
          tty: require.resolve('tty-browserify'),
        },
      },

      plugins: [
        new webpack.ProvidePlugin({
          // why need to add .js?
          process: 'process/browser.js',
          Buffer: ['buffer', 'Buffer'],
        }),
      ],

      optimization: {
        minimize: true,
        minimizer: [
          new EsbuildPlugin({
            target: 'esnext',
            css: true,
          }),
        ],
      },
    }),
};

// export default config;
