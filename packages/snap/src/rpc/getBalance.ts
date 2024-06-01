import { ApiParams, GetBalanceParams } from 'src/types';
import {
  getSnapECDSAWallet,
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

  const { AztecAddress } = await import('@aztec/aztec.js');
  const { TokenContract } = await import('@aztec/noir-contracts.js/Token');

  const { signingPrivateKey } = await getPrivateKeys(apiParams);
  const account = await getSnapECDSAWallet(apiParams, signingPrivateKey, 0);

  const l2tokenContract = await TokenContract.at(
    AztecAddress.fromString(requestParams.token),
    account,
  );

  const balance = await l2tokenContract.methods
    .balance_of_public(AztecAddress.fromString(requestParams.address))
    .simulate();

  const address = account.getAddress();
  const privateBalance = await l2tokenContract.methods
    .balance_of_private(address)
    .simulate({ from: address });

  console.log('privateBalance: ', privateBalance);
  return [Number(balance), Number(privateBalance)];
};
