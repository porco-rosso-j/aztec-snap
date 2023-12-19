// not sure if this would be compatible w/ real funcs in service/pxe
export declare const getAddress: () => Promise<string>;
export declare const getTx: () => Promise<any[]>;
export declare const sendTx: ({ txRequest }: SendTxParams) => Promise<string>;

// Type for getAddress function
export type GetAddressFunction = () => Promise<string>;
export type GetTxFunction = () => Promise<any[]>; // Replace 'any' with a more specific type if possible
export type SendTxFunction = ({ txRequest }: SendTxParams) => Promise<string>;

export type RpcMethods = {
  getAddress: GetAddressFunction;
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

export type SendTxParams = {
  txRequest: string;
};