import { SendTxParams, CreateAuthWitnessParam, SnapRpcRequestParams, RpcMethodTypes } from './types';
export declare const snapRpcRequest: <M extends keyof import("./types").RpcMethods>(args: SnapRpcRequestParams<M>) => Promise<RpcMethodTypes[M]["output"]>;
/**
 * Invoke the "azte_sendTx" RPC method from the snap.
 */
export declare const sendTxSnap: (sendTxParams: SendTxParams, snapId: string) => Promise<string>;
/**
 * Invoke the "azt_getAddress" RPC method from the snap.
 */
export declare const getAddressSnap: (snapId: string) => Promise<string>;
export declare const createAuthWitnessSnap: (createAuthWitnessParam: CreateAuthWitnessParam, snapId: string) => Promise<string>;
export declare const createAccountSnap: (snapId: string) => Promise<string>;
//# sourceMappingURL=snapRpcMethods.d.ts.map