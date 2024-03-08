import type { SendTxParams, GetSnapsResponse, Snap } from '../types/index.js';
/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export declare const getSnaps: () => Promise<GetSnapsResponse>;
/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export declare const connectSnap: (snapId?: string, params?: Record<'version' | string, unknown>) => Promise<void>;
export declare const getSnap: (version?: string) => Promise<Snap | undefined>;
export declare const isLocalSnap: (snapId: string) => boolean;
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