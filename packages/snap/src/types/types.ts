import type { Fr } from '@aztec/aztec.js';
import type { BIP44AddressKeyDeriver } from '@metamask/key-tree';
import type { ManageStateResult } from '@metamask/snaps-sdk';

export type GetSnapsResponse = Record<string, Snap>;

export type Snap = {
  permissionName: string;
  id: string;
  version: string;
  initialPermissions: Record<string, unknown>;
};

export type Account = {
  addressIndex: number;
  compAddress: string;
};

export type ApiParams = {
  state: ManageStateResult;
  requestParams: ApiRequestParams;
  keyDeriver?: BIP44AddressKeyDeriver;
  aztec?: any;
};

export type ApiRequestParams =
  | GetAddressParams
  | GetTxParams
  | SendTxParams
  | CreateAccountParams
  | CreateAuthWitnessParam
  | CreateSecretParams
  | RedeemShieldParams
  | GetPendingShields
  | GetBalanceParams
  | GetTokensParams
  | AddTokenParams
  | AddNoteParams;

export type SerializedFunctionCall = {
  to: string;
  functionData: string;
  args: string[];
};

export type GetAddressParams = {};
export type GetTxParams = {};
export type CreateAccountParams = {};
export type SendTxParams = {
  from: string;
  calls: SerializedFunctionCall[];
  simulatePublic: boolean;
};

export type CreateAuthWitnessParam = {
  from: string;
  message: string;
};

export type CreateSecretParams = {
  from: string;
  contract: string;
};

export type RedeemShieldParams = {
  from: string;
  token: string;
  amount: number;
  secretIndex: number;
  redeemAll: boolean;
};

export type GetPendingShields = {
  from: string;
  token: string;
};

export type RedeemablePendingShield = {
  from: string;
  token: string;
  amount: number;
  secretIndex: number;
};

export type GetBalanceParams = {
  from: string;
  address: string;
  token: string;
};

export type GetTokensParams = {
  from: string;
};

export type AddTokenParams = {
  from: string;
  token: Token;
};

export type Token = {
  address: string;
  name: string;
  symbol: string;
  decimal: number;
};

export type GetTransactionsParams = {
  from: string;
};

export type AddNoteParams = {
  from: string;
  token: string;
  amount: number;
  secretHash: string;
  txHash: string;
};

export type Transaction = {
  txHash: string;
  contract: string;
  private: boolean;
  // date ( or timestamp )
};

export type PrivateKeys = {
  // encryptionPrivateKey: GrumpkinPrivateKey;
  encryptionPrivateKey: Fr;
  signingPrivateKey: Buffer;
};
