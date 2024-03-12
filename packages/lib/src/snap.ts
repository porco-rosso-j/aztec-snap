import type { SendTxParams } from '@abstract-crypto/aztec-snap/dest/index';
import { SnapRpcRequestParams, RpcMethodTypes } from './types';
import { defaultSnapOrigin } from './constants.js';

const snapRpcRequest = async <M extends keyof RpcMethodTypes>(
  args: SnapRpcRequestParams<M>,
) => {
  const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      request: {
        method: `aztec_${args.snapRpcMethod as string}`,
        params: 'params' in args ? args.params : undefined,
      },
      snapId: defaultSnapOrigin,
    },
  });
  return result as unknown as RpcMethodTypes[M]['output'];
};

/**
 * Invoke the "azte_sendTx" RPC method from the snap.
 */

export const sendTxSnap = async ({ txRequest }: SendTxParams) => {
  return snapRpcRequest({
    snapRpcMethod: 'sendTx',
    params: {
      txRequest,
    },
  });
};

/**
 * Invoke the "azt_getAddress" RPC method from the snap.
 */

export const getAddressSnap = async (): Promise<string | undefined> => {
  try {
    const address = snapRpcRequest({
      snapRpcMethod: 'getAddress',
    });
    return address;
  } catch (e) {
    console.log('e: ', e);
    return undefined;
  }
};

export const createAccountSnap = async (): Promise<string | undefined> => {
  try {
    const address = snapRpcRequest({
      snapRpcMethod: 'createAccount',
    });
    return address;
  } catch (e) {
    console.log('e: ', e);
    return undefined;
  }
};
