import { PXE, AccountWallet, CompleteAddress } from '@aztec/aztec.js';
import { RedeemablePendingShield, Token, Transaction } from '@abstract-crypto/aztec-snap';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export declare class SnapWallet extends AccountWallet {
    constructor(_pxe: PXE, _address: CompleteAddress, _snapRpc?: string);
    getBalance(from: string, address: string, token: string): Promise<number[]>;
    createSecretHash(from: string, contract: string): Promise<string>;
    getPendingShields(from: string, token: string): Promise<RedeemablePendingShield[] | undefined>;
    redeemShield(from: string, token: string, amount: number, secretIndex: number): Promise<string>;
    getTransactions(from: string): Promise<Transaction[]>;
    getTokens(from: string): Promise<Token[]>;
    addToken(from: string, token: Token): Promise<void>;
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