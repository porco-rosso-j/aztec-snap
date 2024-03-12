import {
  AuthWitness,
  FunctionCall,
  PackedArguments,
  TxExecutionRequest,
  SignerlessWallet,
  CompleteAddress,
  Fr,
} from '@aztec/aztec.js';
import { TxContext } from '@aztec/circuits.js';
import { sendTxSnap } from './snap.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SnapWallet extends SignerlessWallet {
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

    const signedTxRequestStr = await sendTxSnap({
      txRequest: txRequest.toString(),
    });

    return TxExecutionRequest.fromString(signedTxRequestStr);
  }

  getCompleteAddress(): CompleteAddress {
    throw new Error('Method not implemented.');
  }

  createAuthWitness(_message: Fr): Promise<AuthWitness> {
    throw new Error('Method not implemented.');
  }
}
