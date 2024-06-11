import type { SnapConfig } from '@metamask/snaps-cli';
import { merge } from '@metamask/snaps-cli';
import webpack from 'webpack';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

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
        new webpack.ProgressPlugin(),
        // new BundleAnalyzerPlugin({
        //   analyzerMode: 'static', // Generates a static HTML file
        //   reportFilename: 'bundle-report.html', // The name of the report file
        //   openAnalyzer: true, // Automatically opens the report in the default browser
        // }),
      ],
    }),
};

export default config;
