import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import type { GrumpkinPrivateKey } from '@aztec/aztec.js';
import { SnapsProvider } from '@metamask/snaps-sdk';
import { ApiParams } from '../types';

export const getAddressKeyDeriver = async (snap: SnapsProvider) => {
  // https://trezor.io/learn/a/what-is-bip44
  const bip44Node = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 9008,
    },
  });
  console.log('bip44Node: ', bip44Node);

  // `m / purpose' / coin_type' / account' / change / address_index`
  // `m / 44' / 9004' / 0' / 0 / {index}`
  return getBIP44AddressKeyDeriver(bip44Node);
};

type PrivateKeys = {
  encryptionPrivateKey: GrumpkinPrivateKey;
  signingPrivateKey: Buffer;
};

/**
 * Derive the single account we're using for this snap.
 * The path of the account is m/44'/1'/0'/0/0.
 *
 * @param keyDeriver
 */
export const getPrivateKeys = async (
  apiParams: ApiParams,
): Promise<PrivateKeys> => {
  const { privateKey } = await apiParams.keyDeriver!(0);
  // console.log('privateKey: ', privateKey);
  const reducedPK = new apiParams.aztec.Fq(
    BigInt(privateKey as string) % apiParams.aztec.Fq.MODULUS,
  );
  // console.log('reducedPK: ', reducedPK.toString());

  return {
    encryptionPrivateKey: reducedPK,
    signingPrivateKey: Buffer.from(privateKey as string),
  };
};

// not used atm
// fetch signing public key coordinates
export const getPublicKeys = async (privateKey: Buffer): Promise<string[]> => {
  // const ecdsaAcc = new EcdsaAccountContract(privateKey);
  // const pubkeys: Buffer[] = ecdsaAcc.getDeploymentArgs();

  // const hexPubkeyX = bufferToHex(pubkeys[0]);
  // const hexPubkeyY = bufferToHex(pubkeys[1]);
  // console.log('pubkeys x: ', hexPubkeyX);
  // console.log('pubkeys y: ', hexPubkeyY);

  // return [`0x${hexPubkeyX}`, `0x${hexPubkeyY}`];
  return [''];
};

function bufferToHex(buffer: Buffer) {
  return Array.from(buffer)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
