import {
  ApiParams,
  GetBalanceParams,
  Token,
  UpdateBalancesParams,
} from 'src/types';
import { getSnapECDSAWallet, getPrivateKeys, validateSender } from '../utils';
import type { Wallet } from '@aztec/aztec.js';

export const getBalance = async (apiParams: ApiParams): Promise<number[]> => {
  const requestParams = apiParams.requestParams as GetBalanceParams;
  if (!validateSender(apiParams, requestParams.from)) {
    throw 'selected account does not match "from"';
  }

  const { signingPrivateKey } = await getPrivateKeys(apiParams);
  const account = await getSnapECDSAWallet(apiParams, signingPrivateKey, 0);
  return await _getBalance(account, requestParams.token, requestParams.address);
};

export const updateBalances = async (
  apiParams: ApiParams,
): Promise<Token[]> => {
  const requestParams = apiParams.requestParams as UpdateBalancesParams;
  if (!validateSender(apiParams, requestParams.from)) {
    throw 'selected account does not match "from"';
  }

  const { signingPrivateKey } = await getPrivateKeys(apiParams);
  const account = await getSnapECDSAWallet(apiParams, signingPrivateKey, 0);

  if (!apiParams.state) throw 'snap state unavailable';
  let skip = 0;
  let tokensArray: Token[] = apiParams.state.tokens as Token[];

  const len = requestParams.all
    ? tokensArray.length
    : requestParams.tokens.length;
  for (let i = 0; i < len; i++) {
    let index;
    if (requestParams.all) {
      index = i;
    } else {
      index = tokensArray.findIndex(
        (t) => t.address === requestParams.tokens[i],
      );
      if (index == -1) {
        skip++;
        continue;
      }
    }
    let token = tokensArray[index];
    const balance = await _getBalance(
      account,
      token.address,
      requestParams.address,
    );
    token.pubBalance = balance[0];
    token.priBalance = balance[1];
    tokensArray[index] = token;
  }

  if (!requestParams.all && skip == requestParams.tokens.length)
    throw 'no update';

  apiParams.state.tokens = tokensArray;

  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: apiParams.state,
    },
  });

  return tokensArray;
};

async function _getBalance(
  account: Wallet,
  token: string,
  address: string,
): Promise<[number, number]> {
  const { AztecAddress } = await import('@aztec/aztec.js');
  const { TokenContract } = await import('@aztec/noir-contracts.js/Token');

  const l2tokenContract = await TokenContract.at(
    AztecAddress.fromString(token),
    account,
  );

  const aztecAddress = AztecAddress.fromString(address);

  const publicBalance = await l2tokenContract.methods
    .balance_of_public(aztecAddress)
    .simulate();

  const privateBalance = await l2tokenContract.methods
    .balance_of_private(aztecAddress)
    .simulate({ from: aztecAddress });

  return [Number(publicBalance), Number(privateBalance)];
}
