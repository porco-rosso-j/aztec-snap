import type {
  AztecAddress,
  CompleteAddress,
  Fq,
  Fr,
  PXE,
} from '@aztec/aztec.js';
import { Account, ApiParams } from '../types';

// export type Salt = Fr | number | bigint;
// export const getEcdsaAccountManager = async (
//   apiParams: ApiParams,
//   pxe: PXE,
//   encryptionPrivateKey: Fq,
//   signingPrivateKey: Buffer,
//   salt?: Salt | CompleteAddress,
// ) => {
//   const aztecAccount = await import('@aztec/accounts/ecdsa');
//   return new apiParams.aztec.AccountManager(
//     pxe,
//     encryptionPrivateKey,
//     new aztecAccount.EcdsaAccountContract(signingPrivateKey),
//     salt,
//   );
// };

export const getECDSAWallet = async (
  pxe: PXE,
  adddres: AztecAddress,
  signingPrivateKey: Buffer,
) => {
  const aztecAccount = await import('@aztec/accounts/ecdsa');
  const account = await aztecAccount.getEcdsaWallet(
    pxe,
    adddres,
    signingPrivateKey,
  );

  return account;
};
// export const getECDSAAccount = async (privatekey:Buffer)  => {
//   const aztecAccount = await import('@aztec/accounts/ecdsa');
//   return new aztecAccount.EcdsaAccountContract(privatekey),
// }

export const validateSender = async (
  apiParams: ApiParams,
  fromCompAddr: string,
): Promise<boolean> => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  return accounts.some(
    (account) =>
      new apiParams.aztec.CompleteAddress(
        apiParams.aztec.AztecAddress.fromString(account.address),
        apiParams.aztec.Point.fromString(account.publicKey),
        apiParams.aztec.Fr.fromString(account.partialAddress),
      ).toString() === fromCompAddr,
  );
};

export const getStateAccount = async (
  apiParams: ApiParams,
  index: number,
): Promise<AztecAddress> => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  return apiParams.aztec.AztecAddress.fromString(accounts[index].address);
};
