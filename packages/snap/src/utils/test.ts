// export const getAddressKeyDeriver = async (snap: any) => {
//   console.log('eyo: ');
//   return 'eyo';
// };
import {
  getBIP44AddressKeyDeriver,
  BIP44AddressKeyDeriver,
} from '@metamask/key-tree';
// import {
//   GrumpkinPrivateKey,
//   Fq,
//   initAztecJs,
//   createPXEClient,
// } from '@aztec/aztec.js';
//@ts-ignore
//import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
// import { EcdsaAccountContract } from '@aztec/accounts/ecdsa';
import { SnapsProvider } from '@metamask/snaps-sdk';
import { PXE_URL } from './constants';

export const getAddressKeyDeriver = async (snap: SnapsProvider) => {
  // const pxe = createPXEClient(PXE_URL);
  // await initAztecJs();
  // const aztec = await import('@aztec/aztec.js');
  // const random = aztec.Fq.fromString('abc');
  // console.log('random: ', random);
  // https://trezor.io/learn/a/what-is-bip44
  const bip44Node = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 9008,
    },
  });
  console.log('bip44Node: ', bip44Node);
  console.log('eyo: ');

  // `m / purpose' / coin_type' / account' / change / address_index`
  // `m / 44' / 9004' / 0' / 0 / {index}`
  return getBIP44AddressKeyDeriver(bip44Node);
  //   return 'eyo';
};
