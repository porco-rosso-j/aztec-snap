import { PackedArguments, TxExecutionRequest, SignerlessWallet, } from '@aztec/aztec.js';
import { TxContext } from '@aztec/circuits.js';
import { sendTxSnap } from './snap.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SnapWallet extends SignerlessWallet {
    async createTxExecutionRequest(executions) {
        if (executions.length !== 1) {
            throw new Error(`Unexpected number of executions. Expected 1 but received ${executions.length}).`);
        }
        const [execution] = executions;
        const packedArguments = PackedArguments.fromArgs(execution.args);
        const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
        const txContext = TxContext.empty(chainId, protocolVersion);
        const txRequest = new TxExecutionRequest(execution.to, execution.functionData, packedArguments.hash, txContext, [packedArguments], []);
        const signedTxRequestStr = await sendTxSnap({
            txRequest: txRequest.toString(),
        });
        return TxExecutionRequest.fromString(signedTxRequestStr);
    }
    getCompleteAddress() {
        throw new Error('Method not implemented.');
    }
    createAuthWitness(_message) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGdCQUFnQixHQUdqQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3ZDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFVBQVcsU0FBUSxnQkFBZ0I7SUFDOUMsS0FBSyxDQUFDLHdCQUF3QixDQUM1QixVQUEwQjtRQUUxQixJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNERBQTRELFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FDbEYsQ0FBQztTQUNIO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUMvQixNQUFNLGVBQWUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsRSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM1RCxNQUFNLFNBQVMsR0FBRyxJQUFJLGtCQUFrQixDQUN0QyxTQUFTLENBQUMsRUFBRSxFQUNaLFNBQVMsQ0FBQyxZQUFZLEVBQ3RCLGVBQWUsQ0FBQyxJQUFJLEVBQ3BCLFNBQVMsRUFDVCxDQUFDLGVBQWUsQ0FBQyxFQUNqQixFQUFFLENBQ0gsQ0FBQztRQUVGLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxVQUFVLENBQUM7WUFDMUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUU7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsUUFBWTtRQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGIn0=