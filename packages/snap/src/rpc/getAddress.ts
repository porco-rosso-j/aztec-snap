// import { CompleteAddress, Fr } from '@aztec/aztec.js';
import { Account, ApiParams } from 'src/types';
import { getPrivateKeys } from '../utils/key-utils';

export const getAddress = async (apiParams: ApiParams): Promise<string[]> => {
  const { CompleteAddress, Fr } = await import('@aztec/aztec.js');

  const privateKey = await getPrivateKeys(apiParams);
  // const completeAddress =
  console.log('privateKey: ', privateKey);

  const accounts: Account[] = apiParams.state?.accounts as Account[];
  if (accounts.length != 0) {
    const account = accounts[0];
    // const compAddr = new apiParams.aztec.CompleteAddress(
    //   apiParams.aztec.AztecAddress.fromString(account.address),
    //   apiParams.aztec.Point.fromString(account.publicKey),
    //   apiParams.aztec.Fr.fromString(account.partialAddress),
    // );
    // const compAddr = new CompleteAddress(
    //   AztecAddress.fromString(account.address),
    //   Point.fromString(account.publicKey),
    //   Fr.fromString(account.partialAddress),
    // );

    console.log('account.partialAddress: ', account.partialAddress);

    const compAddr = CompleteAddress.fromSecretKeyAndPartialAddress(
      privateKey.encryptionPrivateKey,
      Fr.fromString(account.partialAddress),
    );

    // fromSecretKeyAndPartialAddress
    console.log('compAddr.toString(): ', compAddr.toString());
    return [compAddr.toString()];
  } else {
    return [];
  }
};

// export const getAddress = async (apiParams: ApiParams): Promise<string[]> => {
//   const accounts: Account[] = apiParams.state?.accounts as Account[];
//   if (accounts.length != 0) {
//     const account = accounts[0];
//     const compAddr = new CompleteAddress(
//       AztecAddress.fromString(account.address),
//       Point.fromString(account.publicKey),
//       Fr.fromString(account.partialAddress),
//     );
//     return [compAddr.toString()];
//   } else {
//     return [];
//   }
// };
