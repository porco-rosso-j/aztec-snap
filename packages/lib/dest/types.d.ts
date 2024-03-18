export type * from '@abstract-crypto/aztec-snap';
import type { CreateAuthWitnessParam, CreateSecretParams, GetBalanceParams, GetPendingShields, RedeemShieldParams, RedeemablePendingShield, SendTxParams } from '@abstract-crypto/aztec-snap';
export type RpcMethods = {
    sendTx: (sendTxParams: SendTxParams) => Promise<string>;
    createAuthWitness: (createAuthWitnessParam: CreateAuthWitnessParam) => Promise<string>;
    accounts: () => Promise<string[]>;
    createAccount: () => Promise<string>;
    createSecretHash: (createSecretParams: CreateSecretParams) => Promise<string>;
    getPendingShields: (getPendingShieldsParams: GetPendingShields) => Promise<RedeemablePendingShield[]>;
    redeemShield: (redeemShieldParams: RedeemShieldParams) => Promise<string>;
    getBalance: (getBalanceParams: GetBalanceParams) => Promise<number[]>;
};
type InferArgs<M extends keyof RpcMethods> = RpcMethods[M] extends (...args: infer A) => unknown ? A[0] : never;
export type RpcMethodTypes = {
    [Method in keyof RpcMethods]: {
        input: InferArgs<Method>;
        output: ReturnType<RpcMethods[Method]>;
    };
};
export type SnapRpcRequestParams<M extends keyof RpcMethodTypes> = RpcMethodTypes[M]['input'] extends undefined ? {
    snapRpcMethod: M;
    snapId: string;
} : {
    snapRpcMethod: M;
    params: RpcMethodTypes[M]['input'];
    snapId: string;
};
//# sourceMappingURL=types.d.ts.map