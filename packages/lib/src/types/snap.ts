import { BIP44AddressKeyDeriver } from '@metamask/key-tree';

export type GetSnapsResponse = Record<string, Snap>;

export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export type SnapState = {
  accounts: Accounts[];
};

export type Accounts = {
  addressIndex: number;
  address: string; // in hex
  publicKey: string; // in hex
};

export type ApiParams = {
  state: SnapState;
  requestParams: ApiRequestParams;
  keyDeriver?: BIP44AddressKeyDeriver;
};

export type ApiRequestParams =
  | GetAddressParams
  | GetTxParams
  | SendTxParams
  | CreateAccountParams;

export type GetAddressParams = {};
export type GetTxParams = {};
export type CreateAccountParams = {};
export type SendTxParams = {
  txRequest: string;
};
