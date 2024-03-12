import type {
  AccountManager,
  FunctionCall,
  AztecAddress,
  TxExecutionRequest,
  PXE,
  CompleteAddress,
  AccountWalletWithPrivateKey,
} from '@aztec/aztec.js';
import {
  PXE_URL,
  getPrivateKeys,
  confirmCreateAccount,
  confirmSendTx,
} from './utils';
import { Account, ApiParams, SendTxParams } from './utils/types';
import { getECDSAWallet, getEcdsaAccountManager } from './utils/accounts';

export const createAccount = async (apiParams: ApiParams): Promise<string> => {
  if (!(await confirmCreateAccount())) {
    throw new Error('Deployment tx must be approved by user');
  }

  if (apiParams.keyDeriver) {
    const { encryptionPrivateKey, signingPrivateKey } = await getPrivateKeys(
      apiParams,
    );

    const pxe = apiParams.aztec.createPXEClient(PXE_URL);

    // github.com/AztecProtocol/aztec-packages/pull/1429
    const account: AccountManager = await getEcdsaAccountManager(
      apiParams,
      pxe,
      encryptionPrivateKey,
      signingPrivateKey,
    );

    const ecdsaWallet = await account.deploy().then((tx) => tx.getWallet());

    const accounts: Account[] = apiParams.state?.accounts as Account[];
    const newAccount: Account = {
      addressIndex: accounts.length,
      address: ecdsaWallet.getCompleteAddress().address.toString(),
      publicKey: ecdsaWallet.getCompleteAddress().publicKey.toString(),
    };

    if (Array.isArray(accounts)) {
      accounts[newAccount.addressIndex] = newAccount;
      if (apiParams.state) {
        apiParams.state.accounts = accounts;
        await snap.request({
          method: 'snap_manageState',
          params: {
            operation: 'update',
            newState: apiParams.state,
          },
        });
      }
    }

    return ecdsaWallet.getCompleteAddress().address.toString();
  } else {
    return '';
  }
};

export const getStateAccount = async (apiParams: ApiParams, index: number) => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  return accounts[index].address;
};

// eslint-disable-next-line jsdoc/require-jsdoc
export const getAddress = async (apiParams: ApiParams): Promise<string> => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  if (accounts.length != 0) {
    const address = accounts[0].address.toString();
    console.log('address: ');
    return address;
  } else {
    return '';
  }
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

  const _txRequest = apiParams.aztec.TxExecutionRequest.fromString(
    requestParams.txRequest,
  );

  const functionCall: FunctionCall = {
    to: _txRequest.origin,
    functionData: _txRequest.functionData,
    args: _txRequest.packedArguments[0].args,
  };

  console.log('functionCall: ', functionCall);

  const { signingPrivateKey } = await getPrivateKeys(apiParams);

  console.log('signingPrivateKey: ', signingPrivateKey.toString());

  const pxe: PXE = apiParams.aztec.createPXEClient(PXE_URL);
  console.log('pxe: ', pxe);

  const addr = await getStateAccount(apiParams, 0);
  console.log('addr: ', addr);

  const senderCompAddr: CompleteAddress | undefined =
    await pxe.getRegisteredAccount(
      apiParams.aztec.AztecAddress.fromString(addr),
    );
  console.log('senderCompAddr: ', senderCompAddr);
  console.log('senderCompAddr addr: ', senderCompAddr?.address.toString());

  const account = await getECDSAWallet(
    pxe,
    senderCompAddr!.address,
    signingPrivateKey,
  );
  console.log('account: ', account);
  console.log('address: ', account.getAddress().toString());

  if (
    !(await confirmSendTx(
      account.getAddress().toString(),
      functionCall.to.toString(),
    ))
  ) {
    throw new Error('Transaction must be approved by user');
  }

  const signedTxRequest: TxExecutionRequest =
    await account.createTxExecutionRequest([functionCall]);
  console.log('signedTxRequest: ', signedTxRequest);
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
