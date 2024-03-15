import {
  AccountManager,
  FunctionCall,
  AztecAddress,
  TxExecutionRequest,
  PXE,
  CompleteAddress,
  AccountWalletWithPrivateKey,
  Point,
} from '@aztec/aztec.js';
import { FunctionData } from '@aztec/circuits.js';
import {
  PXE_URL,
  getPrivateKeys,
  confirmCreateAccount,
  confirmSendTx,
  confirmCreateAuthWitness,
} from './utils';
import {
  Account,
  ApiParams,
  CreateAuthWitnessParam,
  SendTxParams,
} from './types';
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
      partialAddress: ecdsaWallet
        .getCompleteAddress()
        .partialAddress.toString(),
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

export const getStateAccount = async (
  apiParams: ApiParams,
  index: number,
): Promise<AztecAddress> => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  return apiParams.aztec.AztecAddress.fromString(accounts[index].address);
};

// eslint-disable-next-line jsdoc/require-jsdoc
export const getAddress = async (apiParams: ApiParams): Promise<string[]> => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  if (accounts.length != 0) {
    const account = accounts[0];
    const compAddr = new apiParams.aztec.CompleteAddress(
      apiParams.aztec.AztecAddress.fromString(account.address),
      apiParams.aztec.Point.fromString(account.publicKey),
      apiParams.aztec.Fr.fromString(account.partialAddress),
    );
    return [compAddr.toString()];
  } else {
    return [];
  }
};

export const deserializeFunctionCall = async (
  apiParams: ApiParams,
): Promise<FunctionCall> => {
  const requestParams = apiParams.requestParams as SendTxParams;
  const funcCall = requestParams.calls[0];

  const circuitjs = await import('@aztec/circuits.js');
  const functionData = circuitjs.FunctionData.fromBuffer(
    Buffer.from(funcCall.functionData, 'hex'),
  ) as FunctionData;

  const functionCall: FunctionCall = {
    to: apiParams.aztec.AztecAddress.fromString(funcCall.to),
    functionData: functionData,
    args: funcCall.args.map((argStr) => apiParams.aztec.Fr.fromString(argStr)),
  };

  return functionCall;
};

export const validateSender = async (
  apiParams: ApiParams,
  fromCompAddr: string,
): Promise<boolean> => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  return accounts.some(
    (account) =>
      new apiParams.aztec.CompleteAddress(
        apiParams.aztec.AztecAddress.fromString(account.address),
        apiParams.aztec.Point.fromString(account.publicKey),
        apiParams.aztec.Fr.fromString(account.partialAddress),
      ).toString() === fromCompAddr,
  );
};

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

export const createAuthWitness = async (
  apiParams: ApiParams,
): Promise<string> => {
  const requestParams = apiParams.requestParams as CreateAuthWitnessParam;
  if (!validateSender(apiParams, requestParams.from)) {
    throw 'selected account does not match "from"';
  }

  const { signingPrivateKey } = await getPrivateKeys(apiParams);
  const account = await getECDSAWallet(
    apiParams.aztec.createPXEClient(PXE_URL),
    await getStateAccount(apiParams, 0),
    signingPrivateKey,
  );

  if (
    !(await confirmCreateAuthWitness(requestParams.from, requestParams.message))
  ) {
    throw new Error('Message must be signed by user');
  }

  const authWitness = await account.createAuthWitness(
    apiParams.aztec.Fr.fromString(requestParams.message),
  );

  return authWitness.toString();
};

export const getTx = async (): Promise<any[]> => {
  // https://docs.aztec.network/apis/pxe/interfaces/pxe#viewtx
  // pxe.viewTx(functionName, args, to, from?)
  // need unconstrained balance fetch func?
  return [0];
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
