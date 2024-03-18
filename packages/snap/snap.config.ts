import type { SnapConfig } from '@metamask/snaps-cli';
import path, { resolve } from 'path';
import { merge } from '@metamask/snaps-cli';
import webpack from 'webpack';

const config: SnapConfig = {
  bundler: 'webpack',
  // sourceMap: true,
  evaluate: true,
  input: 'src/index.ts',
  manifest: {
    path: './snap.manifest.json',
    update: true,
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
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
    verbose: true,
    builtIns: false,
    buffer: true,
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
            test: /\.ts?$/,
            use: 'ts-loader',
          },
        ],
      },

      target: 'web',
      mode: 'production',

      resolve: {
        extensions: ['.ts', '.js'],
        alias: {
          src: path.resolve(__dirname, 'src/'), // Match the baseUrl in tsconfig.json
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
    }),
};

export default config;
