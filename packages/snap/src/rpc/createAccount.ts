import { AccountManager } from '@aztec/aztec.js';
import { Account, ApiParams } from 'src/types';
import { PXE_URL, confirmCreateAccount, getPrivateKeys } from 'src/utils';

export const createAccount = async (apiParams: ApiParams): Promise<string> => {
  if (!(await confirmCreateAccount())) {
    throw new Error('Deployment tx must be approved by user');
  }

  if (apiParams.keyDeriver) {
    const { encryptionPrivateKey, signingPrivateKey } = await getPrivateKeys(
      apiParams,
    );

    const pxe = apiParams.aztec.createPXEClient(PXE_URL);

    // github.com/AztecProtocol/aztec-packages/pull/1429
    const aztecAccount = await import('@aztec/accounts/ecdsa');
    const account: AccountManager = new apiParams.aztec.AccountManager(
      pxe,
      encryptionPrivateKey,
      new aztecAccount.EcdsaAccountContract(signingPrivateKey),
    );

    const ecdsaWallet = await account.deploy().then((tx) => tx.getWallet());
    const accounts: Account[] = apiParams.state?.accounts as Account[];

    const newAccount: Account = {
      addressIndex: accounts.length,
      address: ecdsaWallet.getCompleteAddress().address.toString(),
      publicKey: ecdsaWallet.getCompleteAddress().publicKey.toString(),
      partialAddress: ecdsaWallet
        .getCompleteAddress()
        .partialAddress.toString(),
    };

    if (Array.isArray(accounts)) {
      accounts[newAccount.addressIndex] = newAccount;
      if (apiParams.state) {
        apiParams.state.accounts = accounts;
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
