import type { SnapConfig } from '@metamask/snaps-cli';
import { merge } from '@metamask/snaps-cli';
// import SnapsWebpackPlugin from '@metamask/snaps-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import { EsbuildPlugin } from 'esbuild-loader';
// import { dirname, resolve } from 'path';
import { resolve } from 'path';
// import ResolveTypeScriptPlugin from 'resolve-typescript-plugin';
// import type { Configuration } from 'webpack';

const config: SnapConfig = {
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
    // library: {
    //   type: 'commonjs',
    // },
  },
  server: {
    enabled: true,
    port: 8080,
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
  },
  polyfills: {
    buffer: true,
    stream: true,
    tty: true,
    util: true,
    // string_decoder: true,
  },
  // customizeWebpackConfig,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  customizeWebpackConfig: (config) =>
    merge(config, {
      module: {
        rules: [
          {
            test: /\.(cjs|js|mjs|ts)$/u,
            exclude: [/node_modules/u],
            loader: 'esbuild-loader',
            options: {
              target: 'es2020',
              tsconfig: './tsconfig.json',
              sourcemap: true,
            },
          },
        ],
      },

      resolve: {
        extensions: ['.ts', '.js', '.cjs', '.mjs'],
        alias: {
          './node/index.js': false,
        },
        fallback: {
          crypto: false,
          os: false,
          fs: false,
          'node:fs': false,
          path: false,
          url: false,
          events: false,
          buffer: require.resolve('buffer/'),
          // util: require.resolve('util/'),
          // stream: require.resolve('stream-browserify'),
          // string_decoder: require.resolve('string_decoder/'),
          // tty: require.resolve('tty-browserify'),
        },
      },
      // plugins: [
      //   new CopyWebpackPlugin({
      //     patterns: [
      //       {
      //         from: `${dirname(require.resolve(`@aztec/circuits.js`)).replace(
      //           /\/dest$/u,
      //           '',
      //         )}/resources/aztec3-circuits.wasm`,
      //         to: 'aztec3-circuits.wasm',
      //       },
      //     ],
      //   }),
      // ],
      optimization: {
        minimize: true,
        minimizer: [
          new EsbuildPlugin({
            target: 'es2020',
            css: true,
          }),
        ],
      },
    }),
};

export default config;
