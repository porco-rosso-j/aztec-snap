import { PXE, AccountWallet, CompleteAddress } from '@aztec/aztec.js';
import { RedeemablePendingShield } from '@abstract-crypto/aztec-snap';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export declare class SnapWallet extends AccountWallet {
    constructor(_pxe: PXE, _address: CompleteAddress, _snapRpc?: string);
    getPendingShields(from: string, token: string, amount: number): Promise<RedeemablePendingShield[] | undefined>;
    redeemShield(from: string, token: string, amount: number, secretIndex: number): Promise<string>;
}
export declare class AztecSnap {
    private pxe;
    protected readonly snapRpc: string;
    constructor(_PXE_URL: string, _snapRpc?: string);
    connect(): Promise<SnapWallet>;
    reconnect(): void;
    disconnect(): void;
    getSelectedAddress(): Promise<string>;
    getSnapWallet(address: CompleteAddress): Promise<SnapWallet>;
}
//# sourceMappingURL=snapWallet.d.ts.map