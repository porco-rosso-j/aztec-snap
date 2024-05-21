import type {
  AztecAddress,
  CompleteAddress,
  Fq,
  Fr,
  PXE,
} from '@aztec/aztec.js';
import { Account, ApiParams } from '../types';

export type Salt = Fr | number | bigint;
export const salt = async (): Promise<Salt> => {
  const aztec = await import(`@aztec/aztec.js`);
  return new aztec.Fr(0);
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
