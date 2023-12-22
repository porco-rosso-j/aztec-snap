import {
  init,
  createPXEClient,
  FunctionCall,
  TxExecutionRequest,
  AccountWalletWithPrivateKey,
  AccountManager,
  AztecAddress,
} from '@aztec/aztec.js';
import {
  ApiParams,
  SnapState,
  Accounts,
  SendTxParams,
} from '@abstract-crypto/aztec-snap-lib';
import { getEcdsaAccount } from './accounts/get_ecdsa';
import {
  PXE_URL,
  getPrivateKeys,
  confirmCreateAccount,
  confirmSendTx,
} from './utils';

export const createAccount = async (apiParams: ApiParams): Promise<string> => {
  if (!(await confirmCreateAccount())) {
    throw new Error('Deployment tx must be approved by user');
  }

  await init();

  const { encryptionPrivateKey, signingPrivateKey } = await getPrivateKeys(
    apiParams.keyDeriver,
  );
  const pxe = createPXEClient(PXE_URL);

  // github.com/AztecProtocol/aztec-packages/pull/1429
  const account: AccountManager = getEcdsaAccount(
    pxe,
    encryptionPrivateKey,
    signingPrivateKey,
  );

  const ecdsaWallet = await account.deploy().then((tx) => tx.getWallet());
  const compAddr = ecdsaWallet.getCompleteAddress();

  const state: SnapState = {
    accounts: [
      {
        addressIndex: 0,
        address: compAddr.address.toString(),
        publicKey: compAddr.publicKey.toString(),
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

  await init();
  const { encryptionPrivateKey, signingPrivateKey } = await getPrivateKeys(
    apiParams.keyDeriver,
  );

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
    senderCompAddr,
  ).getWallet();

  if (
    !(await confirmSendTx(
      accountWallet.getAddress().toString(),
      functionCall.to.toString(),
    ))
  ) {
    throw new Error('Transaction must be approved by user');
  }

  const signedTxRequest: TxExecutionRequest =
    await accountWallet.createTxExecutionRequest([functionCall]);
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

//   const privateKey = await getPrivateKeys();
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
