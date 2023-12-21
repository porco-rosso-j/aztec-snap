export type SnapState = {
  accounts: Accounts[];
  // erc20Tokens: Erc20Token[];
  // networks: Network[];
  // transactions: Transaction[];
  // currentNetwork?: Network;
};

export type Accounts = {
  // addressSalt: string;
  addressIndex: number;
  address: string; // in hex
  publicKey: string; // in hex
  // derivationPath: string;
  // deployTxnHash: string; // in hex
  // chainId: string; // in hex
};