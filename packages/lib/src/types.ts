export type * from '@abstract-crypto/aztec-snap';
import type { SendTxParams } from '@abstract-crypto/aztec-snap/dest/index';

// Type for getAddress function
export type GetAddressFunction = () => Promise<string>;
export type createAccountFunction = () => Promise<string>;
export type GetTxFunction = () => Promise<any[]>; // Replace 'any' with a more specific type if possible
export type SendTxFunction = ({ txRequest }: SendTxParams) => Promise<string>;

export type RpcMethods = {
  getAddress: GetAddressFunction;
  createAccount: createAccountFunction;
  getTx: GetTxFunction;
  sendTx: SendTxFunction;
};

type InferArgs<M extends keyof RpcMethods> = RpcMethods[M] extends (
  ...args: infer A
) => unknown
  ? A[0]
  : never;

export type RpcMethodTypes = {
  [Method in keyof RpcMethods]: {
    input: InferArgs<Method>;
    output: ReturnType<RpcMethods[Method]>;
  };
};

export type SnapRpcRequestParams<M extends keyof RpcMethodTypes> =
  RpcMethodTypes[M]['input'] extends undefined
    ? { snapRpcMethod: M }
    : { snapRpcMethod: M; params: RpcMethodTypes[M]['input'] };
