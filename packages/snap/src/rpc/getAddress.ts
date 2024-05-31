import { Account, ApiParams } from 'src/types';

export const getAddress = async (apiParams: ApiParams): Promise<string[]> => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  if (accounts.length != 0) {
    return [accounts[0].compAddress];
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
