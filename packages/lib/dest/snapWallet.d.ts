import { AuthWitness, FunctionCall, TxExecutionRequest, SignerlessWallet, CompleteAddress, Fr } from '@aztec/aztec.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export declare class SnapWallet extends SignerlessWallet {
    createTxExecutionRequest(executions: FunctionCall[]): Promise<TxExecutionRequest>;
    getCompleteAddress(): CompleteAddress;
    createAuthWitness(_message: Fr): Promise<AuthWitness>;
}
//# sourceMappingURL=snapWallet.d.ts.map