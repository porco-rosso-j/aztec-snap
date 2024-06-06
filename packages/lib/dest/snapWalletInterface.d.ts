import { AuthWitness, TxExecutionRequest, CompleteAddress, Fr, PXE } from '@aztec/aztec.js';
import { AccountInterface } from '@aztec/aztec.js/account';
import { ExecutionRequestInit } from '@aztec/aztec.js/entrypoint';
import { type NodeInfo } from '@aztec/types/interfaces';
export declare class SnapAccountInterface implements AccountInterface {
    private completeAddress;
    private pxe;
    protected readonly snapRpc: string;
    private chainId;
    private version;
    constructor(_pxe: PXE, _completeAddress: CompleteAddress, _nodeInfo: NodeInfo, _snapRpc?: string);
    getAddress(): import("@aztec/aztec.js").AztecAddress;
    getChainId(): Fr;
    getVersion(): Fr;
    createTxExecutionRequest(executions: ExecutionRequestInit): Promise<TxExecutionRequest>;
    createAuthWit(message: Fr): Promise<AuthWitness>;
    getCompleteAddress(): CompleteAddress;
    getSnapId(): string;
}
//# sourceMappingURL=snapWalletInterface.d.ts.map