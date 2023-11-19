import { GatsbyConfig } from 'gatsby';

// const proxy = {
//   target: 'https://execution.consensys.io',
//   changeOrigin: true,
// };

const config: GatsbyConfig = {
  // This is required to make use of the React 17+ JSX transform.
  jsxRuntime: 'automatic',

  plugins: [
    'gatsby-plugin-svgr',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Template Snap',
        icon: 'src/assets/logo.svg',
        theme_color: '#6F4CFF',
        background_color: '#FFFFFF',
        display: 'standalone',
      },
    },
  ],
  // developMiddleware: (app) => {
  //   app.use('/aztec3-circuits.wasm', proxy);
  // },
};

export default config;
