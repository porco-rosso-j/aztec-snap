import { SendTxParams } from './snap.js';
export declare const getAddress: () => Promise<string>;
export declare const createAccount: () => Promise<string>;
export declare const getTx: () => Promise<any[]>;
export declare const sendTx: ({ txRequest }: SendTxParams) => Promise<string>;
export type GetAddressFunction = () => Promise<string>;
export type createAccountFunction = () => Promise<string>;
export type GetTxFunction = () => Promise<any[]>;
export type SendTxFunction = ({ txRequest }: SendTxParams) => Promise<string>;
export type RpcMethods = {
    getAddress: GetAddressFunction;
    createAccount: createAccountFunction;
    getTx: GetTxFunction;
    sendTx: SendTxFunction;
};
type InferArgs<M extends keyof RpcMethods> = RpcMethods[M] extends (...args: infer A) => unknown ? A[0] : never;
export type RpcMethodTypes = {
    [Method in keyof RpcMethods]: {
        input: InferArgs<Method>;
        output: ReturnType<RpcMethods[Method]>;
    };
};
export {};
//# sourceMappingURL=pxe-types.d.ts.map