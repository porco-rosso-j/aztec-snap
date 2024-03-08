import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
    exclude: [
      './node_modules/@aztec/accounts',
      './node_modules/@aztec/aztec.js',
      './node_modules/@aztec/bb.js',
      './node_modules/@aztec/circuits.js',
      './node_modules/@aztec/circuit-types',
      './node_modules/@aztec/ethereum',
      './node_modules/@aztec/foundation',
      './node_modules/@aztec/noir-contracts.js',
      './node_modules/@aztec/protocol-contracts',
      './node_modules/@aztec/types',
    ],
  },
  build: {
    target: 'esnext',
  },
});
