import { AuthWitness, TxExecutionRequest, } from '@aztec/aztec.js';
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
        // TODO: const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
        throw new Error('Method not implemented.');
    }
    getVersion() {
        // TODO: const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
        return this.pxe.getNodeInfo();
        throw new Error('Method not implemented.');
    }
    // createAuthWit(messageHashOrIntent: any): Promise<AuthWitness> {
    //   throw new Error('Method not implemented.');
    // }
    async createTxExecutionRequest(executions) {
        const { calls, authWitnesses = [], packedArguments = [] } = executions;
        if (calls.length > 1) {
            throw new Error(`Expected a single call, got ${calls.length}`);
        }
        const call = calls[0];
        // const entrypointPackedValues = PackedValues.fromValues(call.args);
        // const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
        // const txContext = TxContext.empty(chainId, protocolVersion);
        // const txRequest = new TxExecutionRequest(
        //   call.to,
        //   call.functionData,
        //   entrypointPackedValues.hash,
        //   txContext,
        //   [...packedArguments, entrypointPackedValues],
        //   //authWitnesses,
        //   [],
        // );
        // console.log('functionData: ', txRequest.functionData);
        // const serializedFunctionCall: SerializedFunctionCall = {
        //   to: call.to.toString(),
        //   functionData: txRequest.functionData.toBuffer().toString('hex'),
        //   args: txRequest.argsOfCalls[0].values.map((argFr) => argFr.toString()),
        // };
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
    // async createAuthWitness(message: Fr): Promise<AuthWitness> {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldEludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0SW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxXQUFXLEVBSVgsa0JBQWtCLEdBSW5CLE1BQU0saUJBQWlCLENBQUM7QUFJekIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdyRSxNQUFNLE9BQU8sb0JBQW9CO0lBSy9CLFlBQVksSUFBUyxFQUFFLGdCQUFpQyxFQUFFLFFBQWlCO1FBQ3pFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7SUFDekQsQ0FBQztJQUVELFVBQVU7UUFDUixPQUFPLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUMzQyxDQUFDO0lBQ0QsVUFBVTtRQUNSLDJFQUEyRTtRQUMzRSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNELFVBQVU7UUFDUiwyRUFBMkU7UUFDM0UsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0Qsa0VBQWtFO0lBQ2xFLGdEQUFnRDtJQUNoRCxJQUFJO0lBRUosS0FBSyxDQUFDLHdCQUF3QixDQUM1QixVQUFnQztRQUVoQyxNQUFNLEVBQUUsS0FBSyxFQUFFLGFBQWEsR0FBRyxFQUFFLEVBQUUsZUFBZSxHQUFHLEVBQUUsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUV2RSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLHFFQUFxRTtRQUNyRSxxRUFBcUU7UUFDckUsK0RBQStEO1FBQy9ELDRDQUE0QztRQUM1QyxhQUFhO1FBQ2IsdUJBQXVCO1FBQ3ZCLGlDQUFpQztRQUNqQyxlQUFlO1FBQ2Ysa0RBQWtEO1FBQ2xELHFCQUFxQjtRQUNyQixRQUFRO1FBQ1IsS0FBSztRQUVMLHlEQUF5RDtRQUV6RCwyREFBMkQ7UUFDM0QsNEJBQTRCO1FBQzVCLHFFQUFxRTtRQUNyRSw0RUFBNEU7UUFDNUUsS0FBSztRQUVMLE1BQU0sc0JBQXNCLEdBQTJCO1lBQ3JELEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN0QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQzFELElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pELENBQUM7UUFFRixNQUFNLFlBQVksR0FBRztZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7WUFDckMsS0FBSyxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDL0IsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FBQztRQUVGLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RSxPQUFPLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCwrREFBK0Q7SUFDL0QsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFXO1FBQzdCLE1BQU0sV0FBVyxHQUFHLE1BQU0scUJBQXFCLENBQzdDO1lBQ0UsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ3JDLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFO1NBQzVCLEVBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FDYixDQUFDO1FBQ0YsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Q0FDRiJ9