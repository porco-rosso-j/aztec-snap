import { ApiParams, GetBalanceParams } from 'src/types';
import {
  getECDSAWallet,
  getPrivateKeys,
  getPXE,
  getStateAccount,
  validateSender,
} from '../utils';

export const getBalance = async (apiParams: ApiParams): Promise<number[]> => {
  const requestParams = apiParams.requestParams as GetBalanceParams;
  if (!validateSender(apiParams, requestParams.from)) {
    throw 'selected account does not match "from"';
  }

  const { signingPrivateKey } = await getPrivateKeys(apiParams);
  const account = await getECDSAWallet(
    await getPXE(),
    await getStateAccount(apiParams, 0),
    signingPrivateKey,
  );

  const noirContracts = await import('@aztec/noir-contracts.js');
  const l2tokenContract = await noirContracts.TokenContract.at(
    apiParams.aztec.AztecAddress.fromString(requestParams.token),
    account,
  );

  const balance = await l2tokenContract.methods
    .balance_of_public(
      apiParams.aztec.AztecAddress.fromString(requestParams.address),
    )
    .simulate();

  const aztAddr = account.getAddress();
  const privateBalance = await l2tokenContract.methods
    .balance_of_private(aztAddr)
    .simulate({ from: aztAddr });

  console.log('privateBalance: ', privateBalance);
  return [Number(balance), Number(privateBalance)];
};
