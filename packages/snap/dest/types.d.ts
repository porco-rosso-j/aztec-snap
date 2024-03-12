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
};
export type ApiParams = {
    state: ManageStateResult;
    requestParams: ApiRequestParams;
    keyDeriver?: BIP44AddressKeyDeriver;
    aztec: any;
};
export type ApiRequestParams = GetAddressParams | GetTxParams | SendTxParams | CreateAccountParams;
export type GetAddressParams = {};
export type GetTxParams = {};
export type CreateAccountParams = {};
export type SendTxParams = {
    txRequest: string;
};
