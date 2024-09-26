import {
  AuthWitness,
  TxExecutionRequest,
  CompleteAddress,
  Fr,
  AztecAddress,
} from '@aztec/aztec.js';
import { AccountInterface } from '@aztec/aztec.js/account';
import { SendTxParams, SerializedFunctionCall } from './types';
import { defaultSnapOrigin } from './constants';
import { createAuthWitnessSnap, sendTxSnap } from './snapRpcMethods';
import { ExecutionRequestInit } from '@aztec/aztec.js/entrypoint';
import { type NodeInfo } from '@aztec/types/interfaces';

export class SnapAccountInterface implements AccountInterface {
  private completeAddress: CompleteAddress;
  protected readonly snapRpc: string;
  private chainId: Fr;
  private version: Fr;

  constructor(
    _completeAddress: CompleteAddress,
    _nodeInfo: NodeInfo,
    _snapRpc?: string,
  ) {
    this.completeAddress = _completeAddress;
    this.snapRpc = _snapRpc ? _snapRpc : defaultSnapOrigin;
    this.chainId = new Fr(_nodeInfo.chainId);
    this.version = new Fr(_nodeInfo.protocolVersion);
  }

  getAddress(): AztecAddress {
    return this.getCompleteAddress().address;
  }

  // TODO: have this in localstorage so that it can be fetched w/ `getSelectedAddress`?
  getCompleteAddress(): CompleteAddress {
    return this.completeAddress;
  }

  getSnapId(): string {
    return this.snapRpc;
  }

  getChainId(): Fr {
    return this.chainId;
  }

  getVersion(): Fr {
    return this.version;
  }

  async createTxExecutionRequest(
    executions: ExecutionRequestInit,
  ): Promise<TxExecutionRequest> {
    const { calls } = executions;

    if (calls.length > 1) {
      throw new Error(`Expected a single call, got ${calls.length}`);
    }

    const serializedFunctionCall: SerializedFunctionCall = {
      to: calls[0].to.toString(),
      functionData: calls[0].functionData.toBuffer().toString('hex'),
      args: calls[0].args.map((argFr) => argFr.toString()),
    };

    const sendTxParams: SendTxParams = {
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
}
