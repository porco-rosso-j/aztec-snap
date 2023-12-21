import {
  init,
  createPXEClient,
  PXE,
  getSandboxAccountsWallets,
  GrumpkinPrivateKey,
  FunctionCall,
  TxExecutionRequest,
  AccountWalletWithPrivateKey,
  AccountManager,
  Fq,
  Point,
  AccountWallet,
  AztecAddress,
  SignerlessWallet,
  // getEcdsaAccount,
  getSchnorrAccount,
} from '@aztec/aztec.js';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
import {
  ApiParams,
  SnapState,
  Accounts,
} from '@abstract-crypto/aztec-snap-lib';
import { getEcdsaAccount } from './accounts/get_ecdsa';

import { SendTxParams } from './types';
import { PXE_URL } from './constants';
import { getECDSAKey } from './account';

export const createAccount = async (apiParams: ApiParams): Promise<string> => {
  const confirmationResponse = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Create a new Aztec Account'),
        divider(),
        text('Account Type: ECDSA'),
        divider(),
        text(
          'Private key controlling your new account will be generated from the seed phrase stored in this Metamask Flask.',
        ),
      ]),
    },
  });

  if (confirmationResponse !== true) {
    throw new Error('Deployment tx must be approved by user');
  }

  await init();

  const { encryptionPrivateKey, signingPrivateKey } = await getECDSAKey(
    apiParams.keyDeriver,
  );
  const pxe = createPXEClient(PXE_URL);

  // github.com/AztecProtocol/aztec-packages/pull/1429
  const account: AccountManager = getEcdsaAccount(
    pxe,
    encryptionPrivateKey,
    signingPrivateKey,
  );

  console.log('account: ', account);
  console.log(
    'address: ',
    (await (await account.getWallet()).getAddress()).toString(),
  );

  const ecdsaWallet = await account.deploy().then((tx) => tx.getWallet());
  console.log('ecdsaWallet: ', ecdsaWallet);
  const compAddr = ecdsaWallet.getCompleteAddress();
  console.log('address: ', compAddr.address.toString());
  const pubkey: Point = compAddr.publicKey;
  console.log('publicKey: ', pubkey.toString());
  console.log('partialAddress: ', compAddr.partialAddress.toString());

  const state: SnapState = {
    accounts: [
      {
        addressIndex: 0,
        address: compAddr.address.toString(),
        publicKey: pubkey.toString(),
      } as Accounts,
    ],
  };

  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: state,
    },
  });

  return compAddr.address.toString();
};

// eslint-disable-next-line jsdoc/require-jsdoc
export const getAddress = async (apiParams: ApiParams): Promise<string> => {
  const { address } = apiParams.state.accounts[0];
  console.log('address: ', address);
  return address;
};

export const getTx = async (): Promise<any[]> => {
  // https://docs.aztec.network/apis/pxe/interfaces/pxe#viewtx
  // pxe.viewTx(functionName, args, to, from?)
  // need unconstrained balance fetch func?
  return [0];
};

export const sendTx = async (apiParams: ApiParams): Promise<string> => {
  const requestParams = apiParams.requestParams as SendTxParams;
  console.log('txRequest: ', requestParams.txRequest);

  const _txRequest = TxExecutionRequest.fromString(requestParams.txRequest);

  const functionCall: FunctionCall = {
    to: _txRequest.origin,
    functionData: _txRequest.functionData,
    args: _txRequest.packedArguments[0].args,
  };
  console.log('to: ', functionCall.to.toString());
  console.log('args: ', functionCall.args);

  await init();
  const { encryptionPrivateKey, signingPrivateKey } = await getECDSAKey(
    apiParams.keyDeriver,
  );

  console.log('privateKey: ', encryptionPrivateKey.toString());
  const pxe = createPXEClient(PXE_URL);
  const senderCompAddr = await pxe.getRegisteredAccount(
    AztecAddress.fromString(apiParams.state.accounts[0].address),
  );
  console.log('senderCompAddr: ', senderCompAddr?.address.toString());

  // github.com/AztecProtocol/aztec-packages/pull/1429
  const accountWallet: AccountWalletWithPrivateKey = await getEcdsaAccount(
    pxe,
    encryptionPrivateKey,
    signingPrivateKey,
    // privateKey.toBuffer(),
    senderCompAddr,
  ).getWallet();

  const confirmationResponse = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Confirm transaction'),
        divider(),
        text('Send tx from:'),
        copyable(accountWallet.getAddress().toString()),
        text('Send tx to :'),
        copyable(functionCall.to.toString()),
      ]),
    },
  });

  if (confirmationResponse !== true) {
    throw new Error('Transaction must be approved by user');
  }

  const signedTxRequest: TxExecutionRequest =
    await accountWallet.createTxExecutionRequest([functionCall]);
  console.log('signedTxRequest: ', signedTxRequest);
  console.log('signedTxRequest: ', signedTxRequest.toString());

  // const simulatedTx = await accountWallet.simulateTx(signedTxRequest, true);
  // console.log('simulatedTx: ', simulatedTx.getStats());

  return signedTxRequest.toString();
};

// const recoverAccount = async (aztecAddr: AztecAddress): Promise<string> => {
//   await init();
//   console.log('1');

//   const pxe = createPXEClient(PXE_URL);
//   const compAddr = await pxe.getRegisteredAccount(aztecAddr);

//   console.log('address: ', compAddr?.address.toString());
//   console.log('publicKey: ', compAddr?.publicKey.toString());
//   console.log('partialAddress: ', compAddr?.partialAddress.toString());

//   const privateKey = await getECDSAKey();
//   console.log('2');
//   const wallet: AccountWallet = await getEcdsaAccount(
//     pxe,
//     Fq.fromString(privateKey),
//     Buffer.from(privateKey),
//     // compAddr,
//   ).getWallet();

//   console.log('wallet: ', wallet.getAddress().toString());

//   return compAddr?.address.toString();
// };
