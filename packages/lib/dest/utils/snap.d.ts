import type { SendTxParams } from '../types/index.js';
/**
 * Invoke the "azte_sendTx" RPC method from the snap.
 */
export declare const sendTxSnap: ({ txRequest }: SendTxParams) => Promise<string>;
/**
 * Invoke the "azt_getAddress" RPC method from the snap.
 */
export declare const getAddressSnap: () => Promise<string | undefined>;
//# sourceMappingURL=snap.d.ts.map