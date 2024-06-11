import { SendTxParams, CreateAuthWitnessParam, SnapRpcRequestParams, RpcMethodTypes, CreateSecretParams, RedeemablePendingShield, RedeemShieldParams, GetPendingShields, GetBalanceParams, AddTokenParams, GetTokensParams, UpdateBalancesParams, Token, GetTransactionsParams, Transaction } from './types';
export declare const snapRpcRequest: <M extends keyof import("./types").RpcMethods>(args: SnapRpcRequestParams<M>) => Promise<RpcMethodTypes[M]["output"]>;
/**
 * Invoke the "azte_sendTx" RPC method from the snap.
 */
export declare const sendTxSnap: (sendTxParams: SendTxParams, snapId?: string) => Promise<string>;
/**
 * Invoke the "azt_getAddress" RPC method from the snap.
 */
export declare const getAddressSnap: (snapId?: string) => Promise<string[]>;
export declare const createAuthWitnessSnap: (createAuthWitnessParam: CreateAuthWitnessParam, snapId?: string) => Promise<string>;
export declare const createAccountSnap: (snapId?: string) => Promise<string>;
export declare const createSecretSnap: (createSecretParams: CreateSecretParams, snapId?: string) => Promise<string>;
export declare const getPendingShieldsSnap: (getPendingShieldsParams: GetPendingShields, snapId?: string) => Promise<RedeemablePendingShield[] | undefined>;
export declare const redeemShieldSnap: (redeemShieldParams: RedeemShieldParams, snapId?: string) => Promise<string>;
export declare const getBalanceSnap: (getBalanceParams: GetBalanceParams, snapId?: string) => Promise<number[]>;
export declare const updateBalancesSnap: (getBalanceParams: UpdateBalancesParams, snapId?: string) => Promise<Token[]>;
export declare const addTokenSnap: (addTokenParams: AddTokenParams, snapId?: string) => Promise<void>;
export declare const getTokensSnap: (getTokensParams: GetTokensParams, snapId?: string) => Promise<Token[]>;
export declare const getTransactionsSnap: (getTransactionsParams: GetTransactionsParams, snapId?: string) => Promise<Transaction[]>;
//# sourceMappingURL=snapRpcMethods.d.ts.map