import { AuthWitness, FunctionCall, TxExecutionRequest, CompleteAddress, Fr, PXE } from '@aztec/aztec.js';
import { AccountInterface } from '@aztec/aztec.js/dest/account';
export declare class SnapAccountInterface implements AccountInterface {
    private completeAddress;
    private pxe;
    protected readonly snapRpc: string;
    constructor(_pxe: PXE, _completeAddress: CompleteAddress, _snapRpc?: string);
    createTxExecutionRequest(executions: FunctionCall[]): Promise<TxExecutionRequest>;
    createAuthWitness(message: Fr): Promise<AuthWitness>;
    getCompleteAddress(): CompleteAddress;
    getSnapId(): string;
}
//# sourceMappingURL=snapWalletInterface.d.ts.map