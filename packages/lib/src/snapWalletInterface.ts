import {
  AuthWitness,
  FunctionCall,
  PackedArguments,
  TxExecutionRequest,
  CompleteAddress,
  Fr,
  PXE,
} from '@aztec/aztec.js';
import { AccountInterface } from '@aztec/aztec.js/dest/account';
import { TxContext } from '@aztec/circuits.js';
import { SerializedFunctionCall } from './types';
import { defaultSnapOrigin } from './constants';
import { createAuthWitnessSnap, sendTxSnap } from './snapRpcMethods';

export class SnapAccountInterface implements AccountInterface {
  private completeAddress: CompleteAddress;
  private pxe: PXE;
  protected readonly snapRpc: string;

  constructor(_pxe: PXE, _completeAddress: CompleteAddress, _snapRpc?: string) {
    this.pxe = _pxe;
    this.completeAddress = _completeAddress;
    this.snapRpc = _snapRpc ? _snapRpc : defaultSnapOrigin;
  }

  async createTxExecutionRequest(
    executions: FunctionCall[],
  ): Promise<TxExecutionRequest> {
    if (executions.length !== 1) {
      throw new Error(
        `Unexpected number of executions. Expected 1 but received ${executions.length}).`,
      );
    }
    const [execution] = executions;
    const packedArguments = PackedArguments.fromArgs(execution.args);
    const { chainId, protocolVersion } = await this.pxe.getNodeInfo();
    const txContext = TxContext.empty(chainId, protocolVersion);
    const txRequest = new TxExecutionRequest(
      execution.to,
      execution.functionData,
      packedArguments.hash,
      txContext,
      [packedArguments],
      [],
    );

    const serializedFunctionCall: SerializedFunctionCall = {
      to: execution.to.toString(),
      functionData: txRequest.functionData.toString(),
      args: [txRequest.packedArguments[0].args.toString()],
    };

    const signedTxRequestStr = await sendTxSnap(
      {
        from: this.completeAddress.toString(),
        calls: [serializedFunctionCall],
        simulatePublic: true,
      },
      this.snapRpc,
    );

    return TxExecutionRequest.fromString(signedTxRequestStr);
  }

  async createAuthWitness(message: Fr): Promise<AuthWitness> {
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
