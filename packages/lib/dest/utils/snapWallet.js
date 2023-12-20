import { PackedArguments, TxExecutionRequest, } from '@aztec/types';
import { SignerlessWallet } from '@aztec/aztec.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zbmFwV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxlQUFlLEVBQ2Ysa0JBQWtCLEdBQ25CLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBdUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN2Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxVQUFXLFNBQVEsZ0JBQWdCO0lBQzlDLEtBQUssQ0FBQyx3QkFBd0IsQ0FDNUIsVUFBMEI7UUFFMUIsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUMzQixNQUFNLElBQUksS0FBSyxDQUNiLDREQUE0RCxVQUFVLENBQUMsTUFBTSxJQUFJLENBQ2xGLENBQUM7U0FDSDtRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxVQUFVLENBQUM7UUFDL0IsTUFBTSxlQUFlLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakUsTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEUsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDNUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxrQkFBa0IsQ0FDdEMsU0FBUyxDQUFDLEVBQUUsRUFDWixTQUFTLENBQUMsWUFBWSxFQUN0QixlQUFlLENBQUMsSUFBSSxFQUNwQixTQUFTLEVBQ1QsQ0FBQyxlQUFlLENBQUMsRUFDakIsRUFBRSxDQUNILENBQUM7UUFFRixNQUFNLGtCQUFrQixHQUFHLE1BQU0sVUFBVSxDQUFDO1lBQzFDLFNBQVMsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFO1NBQ2hDLENBQUMsQ0FBQztRQUVILE9BQU8sa0JBQWtCLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELGlCQUFpQixDQUFDLFFBQVk7UUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDRiJ9