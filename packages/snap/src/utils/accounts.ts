import type {
  AztecAddress,
  CompleteAddress,
  Fq,
  Fr,
  PXE,
} from '@aztec/aztec.js';
import { ApiParams } from '../types';

export type Salt = Fr | number | bigint;
export const getEcdsaAccountManager = async (
  apiParams: ApiParams,
  pxe: PXE,
  encryptionPrivateKey: Fq,
  signingPrivateKey: Buffer,
  salt?: Salt | CompleteAddress,
) => {
  const aztecAccount = await import('@aztec/accounts/ecdsa');
  return new apiParams.aztec.AccountManager(
    pxe,
    encryptionPrivateKey,
    new aztecAccount.EcdsaAccountContract(signingPrivateKey),
    salt,
  );
};

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
