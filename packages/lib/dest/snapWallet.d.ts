import { PXE, AccountWallet, CompleteAddress } from '@aztec/aztec.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export declare class SnapWallet extends AccountWallet {
    constructor(_pxe: PXE, _address: CompleteAddress, _snapRpc?: string);
}
export declare class AztecSnap {
    private address;
    private pxe;
    protected readonly snapRpc: string;
    constructor(_PXE_URL: string, _snapRpc?: string);
    connect(): Promise<SnapWallet>;
    reconnect(): void;
    disconnect(): void;
    create(): void;
    getSnapWallet(): SnapWallet;
}
//# sourceMappingURL=snapWallet.d.ts.map