import { ApiParams, CreateAuthWitnessParam } from 'src/types';
import {
  PXE_URL,
  confirmCreateAuthWitness,
  getPrivateKeys,
  getStateAccount,
  getECDSAWallet,
  validateSender,
} from '../utils';

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

  const authWitness = await account.createAuthWit(
    apiParams.aztec.Fr.fromString(requestParams.message),
  );

  return authWitness.toString();
};
