import { Account, ApiParams } from 'src/types';

export const getAddress = async (apiParams: ApiParams): Promise<string[]> => {
  const accounts: Account[] = apiParams.state?.accounts as Account[];
  if (accounts.length != 0) {
    const account = accounts[0];
    const compAddr = new apiParams.aztec.CompleteAddress(
      apiParams.aztec.AztecAddress.fromString(account.address),
      apiParams.aztec.Point.fromString(account.publicKey),
      apiParams.aztec.Fr.fromString(account.partialAddress),
    );
    return [compAddr.toString()];
  } else {
    return [];
  }
};
