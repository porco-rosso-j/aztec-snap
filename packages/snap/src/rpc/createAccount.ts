import type { AccountManager } from '@aztec/aztec.js';
import { Account, ApiParams } from 'src/types';
// import { PXE_URL, confirmCreateAccount, getPrivateKeys, salt } from '../utils';
import { PXE_URL, confirmCreateAccount, getPrivateKeys } from '../utils';

export const createAccount = async (apiParams: ApiParams): Promise<string> => {
  if (!(await confirmCreateAccount())) {
    throw new Error('Deployment tx must be approved by user');
  }

  if (apiParams.keyDeriver) {
    const { encryptionPrivateKey, signingPrivateKey } = await getPrivateKeys(
      apiParams,
    );
    console.log(
      'encryptionPrivateKey createAcc: ',
      encryptionPrivateKey.toString(),
    );
    console.log('signingPrivateKey createAcc: ', signingPrivateKey.toString());

    const { createPXEClient, AccountManager } = await import('@aztec/aztec.js');
    const { EcdsaAccountContract } = await import('@aztec/accounts/ecdsa');

    const pxe = createPXEClient(PXE_URL);
    const account: AccountManager = new AccountManager(
      pxe,
      encryptionPrivateKey,
      new EcdsaAccountContract(signingPrivateKey),
      // await salt() in prod
    );

    console.log('account: ', account);

    // const ecdsaWallet = await account.deploy().then((tx) => tx.getWallet());
    const ecdsaWallet = await account.deploy().getWallet();
    console.log('ecdsaWallet: ', ecdsaWallet.getAddress());
    const accounts: Account[] = apiParams.state?.accounts as Account[];

    console.log(
      'comp addr:addr: ',
      ecdsaWallet.getCompleteAddress().address.toString(),
    );
    console.log(
      'comp addr:partial: ',
      ecdsaWallet.getCompleteAddress().partialAddress.toString(),
    );

    const newAccount: Account = {
      addressIndex: accounts.length,
      address: ecdsaWallet.getCompleteAddress().address.toString(),
      // publicKey: ecdsaWallet.getCompleteAddress().publicKeys.toString(),
      partialAddress: ecdsaWallet
        .getCompleteAddress()
        .partialAddress.toString(),
    };

    if (Array.isArray(accounts)) {
      accounts[newAccount.addressIndex] = newAccount;
      if (apiParams.state) {
        apiParams.state.accounts = accounts;

        console.log('apiParams.state.accounts: ', apiParams.state.accounts);
        await snap.request({
          method: 'snap_manageState',
          params: {
            operation: 'update',
            newState: apiParams.state,
          },
        });
      }
    }

    return ecdsaWallet.getCompleteAddress().address.toString();
  } else {
    return '';
  }
};

// export const createAccount = async (apiParams: ApiParams): Promise<string> => {
//   if (!(await confirmCreateAccount())) {
//     throw new Error('Deployment tx must be approved by user');
//   }

//   if (apiParams.keyDeriver) {
//     const { encryptionPrivateKey, signingPrivateKey } = await getPrivateKeys(
//       apiParams,
//     );
//     console.log(
//       'encryptionPrivateKey createAcc: ',
//       encryptionPrivateKey.toString(),
//     );
//     console.log('signingPrivateKey createAcc: ', signingPrivateKey.toString());

//     const pxe = apiParams.aztec.createPXEClient(PXE_URL);

//     // github.com/AztecProtocol/aztec-packages/pull/1429
//     const aztecAccount = await import('@aztec/accounts/ecdsa');
//     const account: AccountManager = new apiParams.aztec.AccountManager(
//       pxe,
//       encryptionPrivateKey,
//       new aztecAccount.EcdsaAccountContract(signingPrivateKey),
//       // await salt() in prod
//     );

//     // const ecdsaWallet = await account.deploy().then((tx) => tx.getWallet());
//     const ecdsaWallet = await account.deploy().getWallet();
//     const accounts: Account[] = apiParams.state?.accounts as Account[];

//     const newAccount: Account = {
//       addressIndex: accounts.length,
//       address: ecdsaWallet.getCompleteAddress().address.toString(),
//       // publicKey: ecdsaWallet.getCompleteAddress().publicKeys.toString(),
//       partialAddress: ecdsaWallet
//         .getCompleteAddress()
//         .partialAddress.toString(),
//     };

//     if (Array.isArray(accounts)) {
//       accounts[newAccount.addressIndex] = newAccount;
//       if (apiParams.state) {
//         apiParams.state.accounts = accounts;
//         await snap.request({
//           method: 'snap_manageState',
//           params: {
//             operation: 'update',
//             newState: apiParams.state,
//           },
//         });
//       }
//     }

//     return ecdsaWallet.getCompleteAddress().address.toString();
//   } else {
//     return '';
//   }
// };
