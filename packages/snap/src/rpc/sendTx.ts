import type { TxExecutionRequest } from '@aztec/aztec.js';
import type { ExecutionRequestInit } from '@aztec/aztec.js/entrypoint';
import { ApiParams, SendTxParams } from 'src/types';
import {
  confirmSendTx,
  getPrivateKeys,
  getSnapECDSAWallet,
  validateSender,
  deserializeFunctionCall,
} from '../utils';

export const sendTx = async (apiParams: ApiParams): Promise<string> => {
  const requestParams = apiParams.requestParams as SendTxParams;
  if (!validateSender(apiParams, requestParams.from)) {
    throw 'selected account does not match "from"';
  }
  const { functionCall, packedValues } = await deserializeFunctionCall(
    apiParams,
  );
  console.log('functionCall: ', functionCall);
  const { signingPrivateKey } = await getPrivateKeys(apiParams);

  const account = await getSnapECDSAWallet(apiParams, signingPrivateKey, 0);
  console.log('account: ', account);

  if (
    !(await confirmSendTx(
      account.getAddress().toString(),
      functionCall.to.toString(),
      functionCall.functionData.hash().toString(),
    ))
  ) {
    throw new Error('Transaction must be approved by user');
  }

  const authWit = await account.createAuthWit({
    caller: account.getAddress(),
    action: functionCall,
  });

  const execRequest: ExecutionRequestInit = {
    calls: [functionCall],
    authWitnesses: [authWit],
    packedArguments: [packedValues],
  };

  const signedTxRequest: TxExecutionRequest =
    await account.createTxExecutionRequest(execRequest);
  // should save this tx hash in the state
  return signedTxRequest.toString();
};
