// import { getEcdsaAccount, PXE } from '@aztec/aztec.js';

export const getECDSAAccount = async (): Promise<any> => {
  // option 1: fetch Account object from browser storage.
  // as everytime user login, we ask signature which creates some entropy
  // to derive signing key which is stored in local storage.
  // 1: get signing key & encryption key from local storage
  // 2: create ECDSAAccount instance
  // return ECDSAAccount

  // const account = await getEcdsaAccount()
  // const account = new AccountManager(pxe, encryptionPrivateKey, new SchnorrHardcodedKeyAccountContract());
  // https://github.com/AztecProtocol/aztec-packages/blob/43a2e6b68853d5c22fac4563949c83baf443827c/yarn-project/end-to-end/src/guides/writing_an_account_contract.test.ts#L2

  return '';
};

// wallet creation

// https://github.com/porco-rosso-j/eth-rome-2023/blob/mm-login/src/components/WalletLogin.tsx
// const provider = new BrowserProvider(window.ethereum)
// await provider.send("eth_requestAccounts", []);
// const signer = await provider.getSigner();
// console.log("Account:", await signer.getAddress());

// const message = "sign this msg to create new ghsot pay wallet"
// const sigEntropy = (await signer.signMessage(message)).slice(0, 16);

// const snapEntropy = await snap.request({
//     method: 'snap_getEntropy',
//     params: {
//       version: 1,
//       salt: 'foo', // Optional
//     },
//   });

// const combinedEntropy = sigEntropy + BigNumber.from(snapEntropy) + index;
// const entropyBigNumber = ethers.BigNumber.from(combinedEntropy);
// const privateKey = entropyBigNumber.mod(ethers.constants.MaxUint256);
// const privateKeyHex = privateKey.toHexString();
