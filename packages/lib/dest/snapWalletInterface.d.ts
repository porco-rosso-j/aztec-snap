import { AuthWitness, TxExecutionRequest, CompleteAddress, Fr, AztecAddress } from '@aztec/aztec.js';
import { AccountInterface } from '@aztec/aztec.js/account';
import { ExecutionRequestInit } from '@aztec/aztec.js/entrypoint';
import { type NodeInfo } from '@aztec/types/interfaces';
export declare class SnapAccountInterface implements AccountInterface {
    private completeAddress;
    protected readonly snapRpc: string;
    private chainId;
    private version;
    constructor(_completeAddress: CompleteAddress, _nodeInfo: NodeInfo, _snapRpc?: string);
    getAddress(): AztecAddress;
    getCompleteAddress(): CompleteAddress;
    getSnapId(): string;
    getChainId(): Fr;
    getVersion(): Fr;
    createTxExecutionRequest(executions: ExecutionRequestInit): Promise<TxExecutionRequest>;
    createAuthWit(message: Fr): Promise<AuthWitness>;
}
//# sourceMappingURL=snapWalletInterface.d.ts.map