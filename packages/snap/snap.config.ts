import type { SnapConfig } from '@metamask/snaps-cli';
import { merge } from '@metamask/snaps-cli';
import webpack from 'webpack';

const config: SnapConfig = {
  bundler: 'webpack',
  sourceMap: 'inline',
  input: 'src/index.ts',
  server: {
    port: 8081,
  },
  polyfills: {
    process: true,
    buffer: true,
    path: true,
    tty: true,
    util: true,
    crypto: true,
    stream: true,
    string_decoder: true,
    events: true,
  },

  stats: {
    builtIns: false,
  },

  customizeWebpackConfig: (config) =>
    merge(config, {
      plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser.js',
          Buffer: ['buffer', 'Buffer'],
        }),
      ],

      optimization: {
        minimize: true,
        // runtimeChunk: true,
        flagIncludedChunks: true,
      },
    }),
};

export default config;
