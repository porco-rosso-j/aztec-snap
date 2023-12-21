import { CompleteAddress, GrumpkinPrivateKey, PXE } from '@aztec/types';
import { Fr, AccountManager } from '@aztec/aztec.js';
import { EcdsaAccountContract } from './ecdsa_account_contract';

/** A contract deployment salt. */
export type Salt = Fr | number | bigint;

// eslint-disable-next-line jsdoc/require-returns
/**
 * Creates an Account that relies on an ECDSA signing key for authentication.
 *
 * @param pxe - An PXE server instance.
 * @param encryptionPrivateKey - Grumpkin key used for note encryption.
 * @param signingPrivateKey - Secp256k1 key used for signing transactions.
 * @param saltOrAddress - Deployment salt or complete address if account contract is already deployed.
 */
export function getEcdsaAccount(
  pxe: PXE,
  encryptionPrivateKey: GrumpkinPrivateKey,
  signingPrivateKey: Buffer,
  saltOrAddress?: Salt | CompleteAddress,
): AccountManager {
  return new AccountManager(
    pxe,
    encryptionPrivateKey,
    new EcdsaAccountContract(signingPrivateKey),
    saltOrAddress,
  );
}
