import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Ecdsa } from '@aztec/circuits.js/barretenberg';
import { init } from '@aztec/aztec.js';

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

/**
 * Derive the single account we're using for this snap.
 * The path of the account is m/44'/1'/0'/0/0.
 */
export const getECDSAKey = async (): Promise<string> => {
  const keyDeriver = await getAddressKeyDeriver(snap);
  console.log('keyDeriver: ', keyDeriver);
  const { privateKey } = await keyDeriver(0);
  console.log('privateKey: ', privateKey);
  await init();
  const pubkeyAztec = new Ecdsa().computePublicKey(
    Buffer.from(privateKey as string),
  );
  console.log('pubkeyAztec: ', pubkeyAztec);

  return privateKey as string;
};

// option 1: fetch Account object from browser storage.
// as everytime user login, we ask signature which creates some entropy
// to derive signing key which is stored in local storage.
// 1: get signing key & encryption key from local storage
// 2: create ECDSAAccount instance
// return ECDSAAccount
// option 2: fresh wallet
