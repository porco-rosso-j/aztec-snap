import { Snap } from '@abstract-crypto/aztec-snap';
export declare const snapsDetected: () => boolean;
/**
 * Detect if the version of MetaMask is Flask.
 */
export declare const detectFlask: () => Promise<boolean>;
/**
 * Get the Snap informations from MetaMask.
 */
export declare const getSnap: () => Promise<Snap>;
export declare const isLocalSnap: (snapId: string) => boolean;
export declare const isLocalSnapInstalled: (installedSnap: Snap | null) => boolean | null;
//# sourceMappingURL=flask.d.ts.map