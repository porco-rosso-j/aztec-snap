import { ApiParams, CreateSecretParams } from 'src/types';
import { getPrivateKeys, validateSender, computeSecret } from 'src/utils';

export const createSecretHash = async (apiParams: ApiParams) => {
  const requestParams = apiParams.requestParams as CreateSecretParams;
  if (!validateSender(apiParams, requestParams.from)) {
    throw 'selected account does not match "from"';
  }

  let secrets: string[] = apiParams.state?.secrets as string[];
  console.log('secrets: ', secrets);

  const { signingPrivateKey } = await getPrivateKeys(apiParams);
  const secret = await computeSecret(
    requestParams.contract,
    signingPrivateKey,
    secrets.length,
  );

  console.log('secret: ', secret.toString());

  secrets[secrets.length] = secret.toString();

  if (apiParams.state) {
    apiParams.state.secrets = secrets;

    await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: apiParams.state,
      },
    });
  }

  // secret hash
  const secretHash = apiParams.aztec.computeMessageSecretHash(secret);
  console.log('secretHash: ', secretHash.toString());

  return secretHash.toString();
};
