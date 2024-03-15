import { AuthWitness, PackedArguments, TxExecutionRequest, } from '@aztec/aztec.js';
import { TxContext } from '@aztec/circuits.js';
import { defaultSnapOrigin } from './constants';
import { createAuthWitnessSnap, sendTxSnap } from './snapRpcMethods';
export class SnapAccountInterface {
    constructor(_pxe, _completeAddress, _snapRpc) {
        this.pxe = _pxe;
        this.completeAddress = _completeAddress;
        this.snapRpc = _snapRpc ? _snapRpc : defaultSnapOrigin;
    }
    async createTxExecutionRequest(executions) {
        if (executions.length !== 1) {
            throw new Error(`Unexpected number of executions. Expected 1 but received ${executions.length}).`);
        }
        const [execution] = executions;
        const packedArguments = PackedArguments.fromArgs(execution.args);
        const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
        const txContext = TxContext.empty(chainId, protocolVersion);
        const txRequest = new TxExecutionRequest(execution.to, execution.functionData, packedArguments.hash, txContext, [packedArguments], []);
        const args = await Promise.all(txRequest.packedArguments[0].args.map((argFr) => argFr.toString()));
        console.log('args: ', args);
        console.log('args: ', args[0]);
        console.log('functionData: ', txRequest.functionData);
        console.log('functionData: ', txRequest.functionData.selector);
        const serializedFunctionCall = {
            to: execution.to.toString(),
            functionData: txRequest.functionData.toBuffer().toString('hex'),
            args: args,
            // args: [txRequest.packedArguments[0].args.toString()],
        };
        console.log('serializedFunctionCall: ', serializedFunctionCall);
        console.log('functionData: ', txRequest.functionData.toBuffer().toString('hex'));
        const sendTxParams = {
            from: this.completeAddress.toString(),
            calls: [serializedFunctionCall],
            simulatePublic: true,
        };
        console.log('sendTxParams: ', sendTxParams);
        const signedTxRequestStr = await sendTxSnap(sendTxParams, this.snapRpc);
        console.log('signedTxRequestStr: ', signedTxRequestStr);
        return TxExecutionRequest.fromString(signedTxRequestStr);
    }
    async createAuthWitness(message) {
        const authWitness = await createAuthWitnessSnap({
            from: this.completeAddress.toString(),
            message: message.toString(),
        }, this.snapRpc);
        return AuthWitness.fromString(authWitness);
    }
    getCompleteAddress() {
        return this.completeAddress;
    }
    getSnapId() {
        return this.snapRpc;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxXQUFXLEVBRVgsZUFBZSxFQUNmLGtCQUFrQixHQUluQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDaEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXJFLE1BQU0sT0FBTyxvQkFBb0I7SUFLL0IsWUFBWSxJQUFTLEVBQUUsZ0JBQWlDLEVBQUUsUUFBaUI7UUFDekUsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztJQUN6RCxDQUFDO0lBRUQsS0FBSyxDQUFDLHdCQUF3QixDQUM1QixVQUEwQjtRQUUxQixJQUFJLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNERBQTRELFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FDbEYsQ0FBQztTQUNIO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztRQUMvQixNQUFNLGVBQWUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNsRSxNQUFN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