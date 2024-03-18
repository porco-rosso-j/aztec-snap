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

// const secrets = [
//   {
//     index: 0,
//     salt: 0,
//     secertHash: '0x0000',
//     txHash: '0x0000',
//   },
// ];

/*

app side

struct PendingShield {
    index: number,
    salt: string,
    secretHash: string
}

mapping (bytes32 => PendingShield) public shields; // tx hash => ps

how to recover secrets?
just loop but how many times?
up to nonce but more efficient way?
can token contract provide info of how many pending shield an account has?
how to exclude already-read ones?
by number of note given by `pxe.getNotes` or getNoteNonces()

*/
