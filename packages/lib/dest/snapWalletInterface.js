import { AuthWitness, TxExecutionRequest, Fr, } from '@aztec/aztec.js';
import { defaultSnapOrigin } from './constants';
import { createAuthWitnessSnap, sendTxSnap } from './snapRpcMethods';
export class SnapAccountInterface {
    constructor(_pxe, _completeAddress, _nodeInfo, _snapRpc) {
        this.pxe = _pxe;
        this.completeAddress = _completeAddress;
        this.snapRpc = _snapRpc ? _snapRpc : defaultSnapOrigin;
        this.chainId = new Fr(_nodeInfo.chainId);
        this.version = new Fr(_nodeInfo.protocolVersion);
    }
    getAddress() {
        return this.getCompleteAddress().address;
    }
    // getChainId() {
    //   // TODO: const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
    //   // throw new Error('Method not implemented.');
    //   this.snapRpc;
    // }
    // getVersion() {
    //   // TODO: const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
    //   throw new Error('Method not implemented.');
    // }
    getChainId() {
        return this.chainId;
    }
    getVersion() {
        return this.version;
    }
    async createTxExecutionRequest(executions) {
        const { calls, authWitnesses = [], packedArguments = [] } = executions;
        if (calls.length > 1) {
            throw new Error(`Expected a single call, got ${calls.length}`);
        }
        const call = calls[0];
        const serializedFunctionCall = {
            to: call.to.toString(),
            functionData: call.functionData.toBuffer().toString('hex'),
            args: call.args.map((argFr) => argFr.toString()),
        };
        const sendTxParams = {
            from: this.completeAddress.toString(),
            calls: [serializedFunctionCall],
            simulatePublic: true,
        };
        const signedTxRequestStr = await sendTxSnap(sendTxParams, this.snapRpc);
        return TxExecutionRequest.fromString(signedTxRequestStr);
    }
    async createAuthWit(message) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxXQUFXLEVBQ1gsa0JBQWtCLEVBRWxCLEVBQUUsR0FFSCxNQUFNLGlCQUFpQixDQUFDO0FBR3pCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFJckUsTUFBTSxPQUFPLG9CQUFvQjtJQU8vQixZQUNFLElBQVMsRUFDVCxnQkFBaUMsRUFDakMsU0FBbUIsRUFDbkIsUUFBaUI7UUFFakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsT0FBTyxDQUFDO0lBQzNDLENBQUM7SUFDRCxpQkFBaUI7SUFDakIsZ0ZBQWdGO0lBQ2hGLG1EQUFtRDtJQUNuRCxrQkFBa0I7SUFDbEIsSUFBSTtJQUNKLGlCQUFpQjtJQUNqQixnRkFBZ0Y7SUFDaEYsZ0RBQWdEO0lBQ2hELElBQUk7SUFFSixVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxLQUFLLENBQUMsd0JBQXdCLENBQzVCLFVBQWdDO1FBRWhDLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxHQUFHLEVBQUUsRUFBRSxlQUFlLEdBQUcsRUFBRSxFQUFFLEdBQUcsVUFBVSxDQUFDO1FBRXZFLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDaEU7UUFFRCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxzQkFBc0IsR0FBMkI7WUFDckQsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3RCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDMUQsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakQsQ0FBQztRQUVGLE1BQU0sWUFBWSxHQUFHO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRTtZQUNyQyxLQUFLLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUMvQixjQUFjLEVBQUUsSUFBSTtTQUNyQixDQUFDO1FBRUYsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sa0JBQWtCLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBVztRQUM3QixNQUFNLFdBQVcsR0FBRyxNQUFNLHFCQUFxQixDQUM3QztZQUNFLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRTtZQUNyQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRTtTQUM1QixFQUNELElBQUksQ0FBQyxPQUFPLENBQ2IsQ0FBQztRQUNGLE9BQU8sV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0NBQ0YifQ==