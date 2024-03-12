import type { SendTxParams } from '@abstract-crypto/aztec-snap/dest/index';
/**
 * Invoke the "azte_sendTx" RPC method from the snap.
 */
export declare const sendTxSnap: ({ txRequest }: SendTxParams) => Promise<string>;
/**
 * Invoke the "azt_getAddress" RPC method from the snap.
 */
export declare const getAddressSnap: () => Promise<string | undefined>;
export declare const createAccountSnap: () => Promise<string | undefined>;
//# sourceMappingURL=snap.d.ts.map