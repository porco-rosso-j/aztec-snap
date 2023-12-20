import {
  init,
  createPXEClient,
  PXE,
  getSandboxAccountsWallets,
  FunctionCall,
  TxExecutionRequest,
  AccountWalletWithPrivateKey,
  getEcdsaAccount,
} from '@aztec/aztec.js';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
import { SendTxParams } from './types';
import { PXE_URL } from './constants';
import { getECDSAKey } from './account';

export const createAccount = async (): Promise<string> => {
  const privateKey = await getECDSAKey();

  // https://github.com/AztecProtocol/aztec-packages/pull/1429
  const ecdsaAccount = await getEcdsaAccount;
};

// eslint-disable-next-line jsdoc/require-jsdoc
export const getAddress = async (): Promise<string> => {
  const pxe = createPXEClient(PXE_URL);
  await init();
  const accountWallets = await getSandboxAccountsWallets(pxe);
  return await accountWallets[0].getAddress().toString();
};

export const getTx = async (): Promise<any[]> => {
  // https://docs.aztec.network/apis/pxe/interfaces/pxe#viewtx
  // pxe.viewTx(functionName, args, to, from?)
  // need unconstrained balance fetch func?
  return [0];
};

export const sendTx = async ({ txRequest }: SendTxParams): Promise<string> => {
  console.log('txRequest: ', txRequest);

  const _txRequest = TxExecutionRequest.fromString(txRequest);

  const functionCall: FunctionCall = {
    to: _txRequest.origin,
    functionData: _txRequest.functionData,
    args: _txRequest.packedArguments[0].args,
  };

  const pxe: PXE = createPXEClient(PXE_URL);

  await init();
  const accountWallet: AccountWalletWithPrivateKey = (
    await getSandboxAccountsWallets(pxe)
  )[0];

  const confirmationResponse = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Confirm transaction'),
        divider(),
        text('Send the tx from:'),
        copyable(accountWallet.getAddress().toString()),
        text('Send the tx to :'),
        copyable(functionCall.to.toString()),
        text('Function selector:'),
        copyable(functionCall.functionData.selector.toString()),
      ]),
    },
  });

  if (confirmationResponse !== true) {
    throw new Error('Transaction must be approved by user');
  }

  const signedTxRequest: TxExecutionRequest =
    await accountWallet.createTxExecutionRequest([functionCall]);
  console.log('signedTxRequest: ', signedTxRequest);
  return signedTxRequest.toString();
};
