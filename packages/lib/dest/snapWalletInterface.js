import { AuthWitness, 
// PackedArguments,
PackedValues, TxExecutionRequest, } from '@aztec/aztec.js';
import { TxContext } from '@aztec/circuits.js';
import { defaultSnapOrigin } from './constants';
import { createAuthWitnessSnap, sendTxSnap } from './snapRpcMethods';
export class SnapAccountInterface {
    constructor(_pxe, _completeAddress, _snapRpc) {
        this.pxe = _pxe;
        this.completeAddress = _completeAddress;
        this.snapRpc = _snapRpc ? _snapRpc : defaultSnapOrigin;
    }
    getAddress() {
        return this.getCompleteAddress().address;
    }
    getChainId() {
        throw new Error('Method not implemented.');
    }
    getVersion() {
        throw new Error('Method not implemented.');
    }
    createAuthWit(messageHashOrIntent) {
        throw new Error('Method not implemented.');
    }
    async createTxExecutionRequest(executions) {
        const { calls, authWitnesses = [], packedArguments = [] } = executions;
        if (calls.length > 1) {
            throw new Error(`Expected a single call, got ${calls.length}`);
        }
        const call = calls[0];
        const entrypointPackedValues = PackedValues.fromValues(call.args);
        const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
        const txContext = TxContext.empty(chainId, protocolVersion);
        const txRequest = new TxExecutionRequest(call.to, call.functionData, entrypointPackedValues.hash, txContext, [...packedArguments, entrypointPackedValues], 
        //authWitnesses,
        []);
        const serializedFunctionCall = {
            to: call.to.toString(),
            functionData: txRequest.functionData.toBuffer().toString('hex'),
            args: txRequest.argsOfCalls.map((argFr) => argFr.toString()),
        };
        const sendTxParams = {
            from: this.completeAddress.toString(),
            calls: [serializedFunctionCall],
            simulatePublic: true,
        };
        const signedTxRequestStr = await sendTxSnap(sendTxParams, this.snapRpc);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxXQUFXO0FBRVgsbUJBQW1CO0FBQ25CLFlBQVksRUFDWixrQkFBa0IsR0FJbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdyRSxNQUFNLE9BQU8sb0JBQW9CO0lBSy9CLFlBQVksSUFBUyxFQUFFLGdCQUFpQyxFQUFFLFFBQWlCO1FBQ3pFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7SUFDekQsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUMzQyxDQUFDO0lBQ0QsVUFBVTtRQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsVUFBVTtRQUNSLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0QsYUFBYSxDQUFDLG1CQUF3QjtRQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELEtBQUssQ0FBQyx3QkFBd0IsQ0FDNUIsVUFBZ0M7UUFFaEMsTUFBTSxFQUFFLEtBQUssRUFBRSxhQUFhLEdBQUcsRUFBRSxFQUFFLGVBQWUsR0FBRyxFQUFFLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFFdkUsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNoRTtRQUVELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLHNCQUFzQixHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xFLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sU0FBUyxHQUFHLElBQUksa0JBQWtCLENBQ3RDLElBQUksQ0FBQyxFQUFFLEVBQ1AsSUFBSSxDQUFDLFlBQVksRUFDakIsc0JBQXNCLENBQUMsSUFBSSxFQUMzQixTQUFTLEVBQ1QsQ0FBQyxHQUFHLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQztRQUM1QyxnQkFBZ0I7UUFDaEIsRUFBRSxDQUNILENBQUM7UUFFRixNQUFNLHNCQUFzQixHQUEyQjtZQUNyRCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDdEIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUMvRCxJQUFJLEVBQUUsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM3RCxDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQUc7WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ3JDLEtBQUssRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQy9CLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUM7UUFFRixNQUFNLGtCQUFrQixHQUFHLE1BQU0sVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsT0FBTyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQVc7UUFDakMsTUFBTSxXQUFXLEdBQUcsTUFBTSxxQkFBcUIsQ0FDN0M7WUFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7WUFDckMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUU7U0FDNUIsRUFDRCxJQUFJLENBQUMsT0FBTyxDQUNiLENBQUM7UUFDRixPQUFPLFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztDQUNGIn0=