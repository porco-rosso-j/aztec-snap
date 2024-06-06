import {
  AuthWitness,
  TxExecutionRequest,
  CompleteAddress,
  Fr,
  PXE,
} from '@aztec/aztec.js';
import { AccountInterface } from '@aztec/aztec.js/account';
import { SerializedFunctionCall } from './types';
import { defaultSnapOrigin } from './constants';
import { createAuthWitnessSnap, sendTxSnap } from './snapRpcMethods';
import { ExecutionRequestInit } from '@aztec/aztec.js/entrypoint';
import { type NodeInfo } from '@aztec/types/interfaces';

export class SnapAccountInterface implements AccountInterface {
  private completeAddress: CompleteAddress;
  private pxe: PXE;
  protected readonly snapRpc: string;
  private chainId: Fr;
  private version: Fr;

  constructor(
    _pxe: PXE,
    _completeAddress: CompleteAddress,
    _nodeInfo: NodeInfo,
    _snapRpc?: string,
  ) {
    this.pxe = _pxe;
    this.completeAddress = _completeAddress;
    this.snapRpc = _snapRpc ? _snapRpc : defaultSnapOrigin;
    this.chainId = new Fr(_nodeInfo.chainId);
    this.version = new Fr(_nodeInfo.protocolVersion);
  }

  getAddress() {
    return this.getCompleteAddress().address;
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
