import {
  AuthWitness,
  TxExecutionRequest,
  CompleteAddress,
  Fr,
  PXE,
} from '@aztec/aztec.js';
import { AccountInterface } from '@aztec/aztec.js/dest/account';
import { SerializedFunctionCall } from './types';
import { defaultSnapOrigin } from './constants';
import { createAuthWitnessSnap, sendTxSnap } from './snapRpcMethods';
import { ExecutionRequestInit } from '@aztec/aztec.js/dest/entrypoint/entrypoint';

export class SnapAccountInterface implements AccountInterface {
  private completeAddress: CompleteAddress;
  private pxe: PXE;
  protected readonly snapRpc: string;

  constructor(_pxe: PXE, _completeAddress: CompleteAddress, _snapRpc?: string) {
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
    throw new Error('Method not implemented.');
  }

  async createTxExecutionRequest(
    executions: ExecutionRequestInit,
  ): Promise<TxExecutionRequest> {
    const { calls, authWitnesses = [], packedArguments = [] } = executions;

    if (calls.length > 1) {
      throw new Error(`Expected a single call, got ${calls.length}`);
    }

    const call = calls[0];
    const serializedFunctionCall: SerializedFunctionCall = {
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

  async createAuthWit(message: Fr): Promise<AuthWitness> {
    const authWitness = await createAuthWitnessSnap(
      {
        from: this.completeAddress.toString(),
        message: message.toString(),
      },
      this.snapRpc,
    );
    return AuthWitness.fromString(authWitness);
  }

  getCompleteAddress(): CompleteAddress {
    return this.completeAddress;
  }

  getSnapId(): string {
    return this.snapRpc;
  }
}
