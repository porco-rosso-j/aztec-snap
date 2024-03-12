import type { SnapConfig } from '@metamask/snaps-cli';
// const path = require('path');
// eslint-disable-next-line no-unused-vars
// const { dirname, resolve } = require('path');
// const { merge } = require('@metamask/snaps-cli');
// const { EsbuildPlugin } = require('esbuild-loader');
// const ResolveTypeScriptPlugin = require('resolve-typescript-plugin');
// const webpack = require('webpack');
import { dirname, resolve } from 'path';
import { merge } from '@metamask/snaps-cli';
import { EsbuildPlugin } from 'esbuild-loader';
import ResolveTypeScriptPlugin from 'resolve-typescript-plugin';
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
      // module: {
      //   rules: [
      //     {
      //       test: /\.(cjs|js|mjs|ts)$/u,
      //       loader: 'esbuild-loader',
      //       options: {
      //         target: 'esnext',
      //         tsconfig: './tsconfig.json',
      //         // sourcemap: true,
      //       },
      //       exclude: /node_modules/,
      //     },
      //   ],
      // },
      module: {
        rules: [
          {
            test: /\.ts?$/,
            //test: /\.(cjs|js|mjs|ts)$/u,
            use: 'ts-loader',
            // target: 'esnext',
            // tsconfig: './tsconfig.json',
          },
          // {
          //   test: /\.css$/i,
          //   use: ['style-loader', 'css-loader', 'postcss-loader'],
          // },
        ],
      },

      target: 'web',
      mode: 'production',

      resolve: {
        // plugins: [new ResolveTypeScriptPlugin()],
        //extensions: ['.ts', '.js', '.cjs', '.mjs', '.wasm'],
        extensions: ['.tsx', '.ts', '.js'],

        // alias: {
        //   './node/index.js': false,
        //   '@aztec/aztec.js': path.resolve(
        //     __dirname,
        //     '../../node_modules/@aztec/aztec.js/dest/index.js',
        //   ),
        // },
        fallback: {
          crypto: false,
          os: false,
          fs: false,
          path: false,
          url: false,
          // events: false,
          worker_threads: false,
          events: require.resolve('events/'),
          buffer: require.resolve('buffer/'),
          // eslint-disable-next-line node/no-extraneous-require
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

      // optimization: {
      //   minimize: true,
      //   minimizer: [
      //     new EsbuildPlugin({
      //       target: 'esnext',
      //       css: true,
      //     }),
      //   ],
      // },
    }),
};

export default config;
