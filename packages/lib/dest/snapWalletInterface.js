import { AuthWitness, TxExecutionRequest, Fr, } from '@aztec/aztec.js';
import { defaultSnapOrigin } from './constants';
import { createAuthWitnessSnap, sendTxSnap } from './snapRpcMethods';
export class SnapAccountInterface {
    constructor(_completeAddress, _nodeInfo, _snapRpc) {
        this.completeAddress = _completeAddress;
        this.snapRpc = _snapRpc ? _snapRpc : defaultSnapOrigin;
        this.chainId = new Fr(_nodeInfo.chainId);
        this.version = new Fr(_nodeInfo.protocolVersion);
    }
    getAddress() {
        return this.getCompleteAddress().address;
    }
    // TODO: have this in localstorage so that it can be fetched w/ `getSelectedAddress`?
    getCompleteAddress() {
        return this.completeAddress;
    }
    getSnapId() {
        return this.snapRpc;
    }
    getChainId() {
        return this.chainId;
    }
    getVersion() {
        return this.version;
    }
    async createTxExecutionRequest(executions) {
        const { calls } = executions;
        if (calls.length > 1) {
            throw new Error(`Expected a single call, got ${calls.length}`);
        }
        const serializedFunctionCall = {
            to: calls[0].to.toString(),
            functionData: calls[0].functionData.toBuffer().toString('hex'),
            args: calls[0].args.map((argFr) => argFr.toString()),
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxXQUFXLEVBQ1gsa0JBQWtCLEVBRWxCLEVBQUUsR0FFSCxNQUFNLGlCQUFpQixDQUFDO0FBR3pCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFJckUsTUFBTSxPQUFPLG9CQUFvQjtJQU0vQixZQUNFLGdCQUFpQyxFQUNqQyxTQUFtQixFQUNuQixRQUFpQjtRQUVqQixJQUFJLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDM0MsQ0FBQztJQUVELHFGQUFxRjtJQUNyRixrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxLQUFLLENBQUMsd0JBQXdCLENBQzVCLFVBQWdDO1FBRWhDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFFN0IsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNoRTtRQUVELE1BQU0sc0JBQXNCLEdBQTJCO1lBQ3JELEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUMxQixZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQzlELElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3JELENBQUM7UUFFRixNQUFNLFlBQVksR0FBaUI7WUFDakMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ3JDLEtBQUssRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQy9CLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUM7UUFFRixNQUFNLGtCQUFrQixHQUFHLE1BQU0sVUFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsT0FBTyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFXO1FBQzdCLE1BQU0sV0FBVyxHQUFHLE1BQU0scUJBQXFCLENBQzdDO1lBQ0UsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ3JDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFO1NBQzVCLEVBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FDYixDQUFDO1FBQ0YsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDRiJ9