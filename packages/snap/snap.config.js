const { merge } = require('@metamask/snaps-cli');
const { EsbuildPlugin } = require('esbuild-loader');
const { resolve } = require('path');
const ResolveTypeScriptPlugin = require('resolve-typescript-plugin');

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
  },
  polyfills: {
    buffer: true,
    stream: true,
    tty: true,
    util: true,
  },

  // eslint-disable-next-line @typescript-eslint/no-shadow
  customizeWebpackConfig: (config) =>
    merge(config, {
      module: {
        rules: [
          {
            test: /\.(cjs|js|mjs|ts)$/u,
            // exclude: [/node_modules/u],
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
        extensions: ['.ts', '.js', '.cjs', '.mjs'],
        alias: {
          './node/index.js': false,
        },
        fallback: {
          crypto: false,
          os: false,
          fs: false,
          path: false,
          url: false,
          events: false,
          buffer: require.resolve('buffer/'),
        },
      },
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
