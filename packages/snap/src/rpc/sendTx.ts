import { TxExecutionRequest } from '@aztec/aztec.js';
import { ApiParams, SendTxParams } from 'src/types';
import {
  PXE_URL,
  confirmSendTx,
  getPrivateKeys,
  getECDSAWallet,
  getStateAccount,
  validateSender,
  deserializeFunctionCall,
} from 'src/utils';

export const sendTx = async (apiParams: ApiParams): Promise<string> => {
  const requestParams = apiParams.requestParams as SendTxParams;
  if (!validateSender(apiParams, requestParams.from)) {
    throw 'selected account does not match "from"';
  }
  const functionCall = await deserializeFunctionCall(apiParams);
  const { signingPrivateKey } = await getPrivateKeys(apiParams);
  const account = await getECDSAWallet(
    apiParams.aztec.createPXEClient(PXE_URL),
    await getStateAccount(apiParams, 0),
    signingPrivateKey,
  );

  if (
    !(await confirmSendTx(
      account.getAddress().toString(),
      functionCall.to.toString(),
      functionCall.functionData.hash().toString(),
    ))
  ) {
    throw new Error('Transaction must be approved by user');
  }

  const signedTxRequest: TxExecutionRequest =
    await account.createTxExecutionRequest([functionCall]);
  // should save this tx hash in the state
  return signedTxRequest.toString();
};
