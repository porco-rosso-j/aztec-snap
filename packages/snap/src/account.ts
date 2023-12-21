/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable jsdoc/require-param-description */
import {
  getBIP44AddressKeyDeriver,
  BIP44AddressKeyDeriver,
} from '@metamask/key-tree';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Ecdsa, Point } from '@aztec/circuits.js/barretenberg';
import { Wallet } from 'ethers';
import { EcdsaAccountContract, GrumpkinPrivateKey, Fq } from '@aztec/aztec.js';

export const getAddressKeyDeriver = async (snap: any) => {
  // https://trezor.io/learn/a/what-is-bip44
  const bip44Node = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 9008,
    },
  });

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
export const getECDSAKey = async (
  keyDeriver: BIP44AddressKeyDeriver,
): Promise<PrivateKeys> => {
  console.log('keyDeriver: ', keyDeriver);
  const { privateKey } = await keyDeriver(0);
  console.log('privateKey: ', privateKey);
  // const ecdsa = new Ecdsa();
  // console.log('ecdsa: ', ecdsa);
  // await init();
  // const pubkeyAztec: Point = ecdsa.computePublicKey(
  //   Buffer.from(privateKey as string),
  // );

  // console.log('pubkeyAztec: ', pubkeyAztec);
  // console.log('pubkeyAztec str: ', pubkeyAztec.toString());

  // const wallet = new Wallet(privateKey as string);
  // console.log('pubkey ethers: ', wallet.publicKey);

  const reducedPK = await reduceETHPKintoGrumpkin(privateKey as string);
  console.log('reducedPK: ', reducedPK.toString());
  return {
    encryptionPrivateKey: reducedPK,
    signingPrivateKey: Buffer.from(privateKey as string),
  };
};

async function reduceETHPKintoGrumpkin(
  ethPrivateKey: string,
): Promise<GrumpkinPrivateKey> {
  const fqModulus = Fq.MODULUS;
  console.log('fqModulus: ', fqModulus);
  return new Fq(
    (BigInt(ethPrivateKey) % fqModulus) % fqModulus,
  ) as GrumpkinPrivateKey;
}

// option 1: fetch Account object from browser storage.
// as everytime user login, we ask signature which creates some entropy
// to derive signing key which is stored in local storage.
// 1: get signing key & encryption key from local storage
// 2: create ECDSAAccount instance
// return ECDSAAccount
// option 2: fresh wallet

export const getPublicKeys = async (privateKey: Buffer): Promise<string[]> => {
  const ecdsaAcc = new EcdsaAccountContract(privateKey);
  const pubkeys = ecdsaAcc.getDeploymentArgs();
  console.log('pubkeys: ', pubkeys);
  const hexPubkeyX = Array.from(new Uint8Array(pubkeys[0]))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  console.log('pubkeys x: ', hexPubkeyX);
  const hexPubkeyY = Array.from(new Uint8Array(pubkeys[1]))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  console.log('pubkeys y: ', hexPubkeyY);
  return [`0x${hexPubkeyX}`, `0x${hexPubkeyY}`];
};
