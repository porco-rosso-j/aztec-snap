import { ApiParams, CreateSecretParams } from 'src/types';
import { getPrivateKeys, validateSender } from 'src/utils';

// type CreateSecretParams = {
//   from: string;
// };

type PendingShieldsSecret = {
  owner: string;
  secret: string;
  txHash?: string;
};

export const createSecret = async (apiParams: ApiParams) => {
  const requestParams = apiParams.requestParams as CreateSecretParams;
  if (!validateSender(apiParams, requestParams.from)) {
    throw 'selected account does not match "from"';
  }

  // store secret
  //   const secrets: PendingShieldsSecret[] = apiParams.state
  //     ?.secrets as PendingShieldsSecret[];
  let secrets: string[] = apiParams.state?.secrets as string[];
  console.log('secrets: ', secrets);
  console.log('secrets len: ', secrets.length);

  const { signingPrivateKey } = await getPrivateKeys(apiParams);
  const message = await serializeMessage(
    secrets.length.toString(),
    '0', // salt ≒ chain id
    signingPrivateKey,
  );

  // secret
  const secret = apiParams.aztec.computeMessageSecretHash(message);
  console.log('secret: ', secret);

  //   secrets[secrets.length] = {
  //     owner: requestParams.from,
  //     secret: secret,
  //   };
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

const serializeMessage = async (
  index: string,
  salt: string,
  privateKey: Buffer,
) => {
  const indexBuffer = Buffer.from(index);
  const saltBuffer = Buffer.from(salt);

  const aztec = await import('@aztec/aztec.js');
  return aztec.Fr.fromBuffer(
    Buffer.concat([indexBuffer, privateKey, saltBuffer]),
  );
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
