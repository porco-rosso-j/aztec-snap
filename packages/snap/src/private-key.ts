import { BIP44Node, getBIP44AddressKeyDeriver } from '@metamask/key-tree';

/**
 * Derive the single account we're using for this snap.
 * The path of the account is m/44'/1'/0'/0/0.
 */
export const getAccount = async (): Promise<BIP44Node> => {
  const dogecoinTestnetNode = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 1, // 1 is for all Testnets
    },
  });

  const deriveDogecoinTestnetPrivateKey = await getBIP44AddressKeyDeriver(
    dogecoinTestnetNode,
  );

  return deriveDogecoinTestnetPrivateKey(0);
};

export const getECDSAAccount = async (): Promise<any> => {
  // option 1: fetch Account object from browser storage.
  // as everytime user login, we ask signature which creates some entropy
  // to derive signing key which is stored in local storage.
  // 1: get signing key & encryption key from local storage
  // 2: create ECDSAAccount instance
  // return ECDSAAccount
  // option 2: fresh wallet
};
