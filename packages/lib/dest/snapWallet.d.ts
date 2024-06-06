import { PXE, AccountWallet, CompleteAddress, NodeInfo } from '@aztec/aztec.js';
import { RedeemablePendingShield, Token, Transaction } from '@abstract-crypto/aztec-snap';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export declare class SnapWallet extends AccountWallet {
    constructor(_pxe: PXE, _address: CompleteAddress, _nodeInfo: NodeInfo, _snapRpc?: string);
    getBalance(address: string, token: string): Promise<number[]>;
    updateBalances(address: string, tokens: string[], all: boolean): Promise<Token[]>;
    createSecretHash(contract: string): Promise<string>;
    getPendingShields(token: string): Promise<RedeemablePendingShield[] | undefined>;
    redeemShield(token: string, amount: number, secretIndex: number): Promise<string>;
    getTransactions(): Promise<Transaction[]>;
    getTokens(): Promise<Token[]>;
    addToken(token: Token): Promise<void>;
}
export declare class AztecSnap {
    private pxe;
    protected readonly snapRpc: string;
    constructor(_PXE_URL: string, _snapRpc?: string);
    connect(): Promise<SnapWallet>;
    disconnect(): void;
    getSelectedAddress(): Promise<string>;
    getSnapWallet(address: CompleteAddress): Promise<SnapWallet>;
}
//# sourceMappingURL=snapWallet.d.ts.map