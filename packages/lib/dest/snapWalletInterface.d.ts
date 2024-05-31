import { AuthWitness, TxExecutionRequest, CompleteAddress, Fr, PXE } from '@aztec/aztec.js';
import { AccountInterface } from '@aztec/aztec.js/dest/account';
import { ExecutionRequestInit } from '@aztec/aztec.js/dest/entrypoint/entrypoint';
export declare class SnapAccountInterface implements AccountInterface {
    private completeAddress;
    private pxe;
    protected readonly snapRpc: string;
    constructor(_pxe: PXE, _completeAddress: CompleteAddress, _snapRpc?: string);
    getAddress(): AztecAddress;
    getChainId(): void;
    getVersion(): Promise<NodeInfo>;
    createTxExecutionRequest(executions: ExecutionRequestInit): Promise<TxExecutionRequest>;
    createAuthWit(message: Fr): Promise<AuthWitness>;
    getCompleteAddress(): CompleteAddress;
    getSnapId(): string;
}
//# sourceMappingURL=snapWalletInterface.d.ts.map