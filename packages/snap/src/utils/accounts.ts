import type { CompleteAddress } from '@aztec/aztec.js';
import { Account, ApiParams } from '../types';
import { getPXE } from './constants';

export const getSnapECDSAWallet = async (
  apiParams: ApiParams,
  signingPrivateKey: Buffer,
  index: number,
) => {
  const { getEcdsaWallet } = await import('@aztec/accounts/ecdsa');
  const compAddress = await getStateAccount(apiParams, index);
  console.log('compAddress: ', compAddress);
  const account = await getEcdsaWallet(
    await getPXE(),
    compAddress.address,
    signingPrivateKey,
  );

  return account;
};

export const getStateAccount = async (
  apiParams: ApiParams,
  index: number,
): Promise<CompleteAddress> => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  console.log('accounts: ', accounts);
  const { CompleteAddress } = await import('@aztec/aztec.js');
  return CompleteAddress.fromString(accounts[index].compAddress);
};

export const validateSender = async (
  apiParams: ApiParams,
  fromCompAddr: string,
): Promise<boolean> => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  // TODO: needs to check if fromCompAddr == current selected acc.
  return accounts.some((account) => account.compAddress == fromCompAddr);
};

// export type Salt = Fr | number | bigint;
// export const salt = async (): Promise<Salt> => {
//   const aztec = await import(`@aztec/aztec.js`);
//   return new aztec.Fr(0);
// };

// export const validateSender = async (
//   apiParams: ApiParams,
//   fromCompAddr: string,
// ): Promise<boolean> => {
//   const accounts: Account[] = apiParams.state?.accounts as Account[];
//   return accounts.some(
//     (account) =>
//       new apiParams.aztec.CompleteAddress(
//         apiParams.aztec.AztecAddress.fromString(account.address),
//         // apiParams.aztec.Point.fromString(account.publicKey),
//         apiParams.aztec.Fr.fromString(account.partialAddress),
//       ).toString() === fromCompAddr,
//   );
// };
