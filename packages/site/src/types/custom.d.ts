/* eslint-disable*/

/// <reference types="react-scripts" />

import { MetaMaskInpageProvider } from '@metamask/providers';
/*
 * Window type extension to support ethereum
 */

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }

  // interface Window {
  //   snap: SnapsGlobalObject;
  // }
}

// declare module '@ziad-saab/dogecoin-snap' {
//   export const snap: SnapsGlobalObject;
//   // Add any additional type declarations you need here
// }

// declare const snap: SnapsGlobalObject;

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}
