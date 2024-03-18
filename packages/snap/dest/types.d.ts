/// <reference types="node" />
import { GrumpkinPrivateKey } from '@aztec/aztec.js';
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
    address: string;
    publicKey: string;
    partialAddress: string;
};
export type ApiParams = {
    state: ManageStateResult;
    requestParams: ApiRequestParams;
    keyDeriver?: BIP44AddressKeyDeriver;
    aztec: any;
};
export type ApiRequestParams = GetAddressParams | GetTxParams | SendTxParams | CreateAccountParams | CreateAuthWitnessParam | CreateSecretParams | RedeemShieldParams;
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
    amount: number;
};
export type RedeemablePendingShield = {
    from: string;
    token: string;
    amount: number;
    secretIndex: number;
};
export type PrivateKeys = {
    encryptionPrivateKey: GrumpkinPrivateKey;
    signingPrivateKey: Buffer;
};
