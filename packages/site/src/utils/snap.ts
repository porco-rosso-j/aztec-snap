import type {
  RpcMethodTypes,
  MakeTransactionParams,
  SendTxParams,
} from '@ziad-saab/dogecoin-snap';
import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');

type SnapRpcRequestParams<M extends keyof RpcMethodTypes> =
  RpcMethodTypes[M]['input'] extends undefined
    ? { snapRpcMethod: M }
    : { snapRpcMethod: M; params: RpcMethodTypes[M]['input'] };

// const snapRpcRequest = async () => {
//   return '';
// };

const snapRpcRequest = async <M extends keyof RpcMethodTypes>(
  args: SnapRpcRequestParams<M>,
) => {
  const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: {
        // method: `azt_${args.snapRpcMethod}`,
        method: `azt_${args.snapRpcMethod as string}`,
        params: 'params' in args ? args.params : undefined,
      },
    },
  });

  return result as unknown as RpcMethodTypes[M]['output'];
};

// export const sendTxSnap = async () => {
//   return '';
// };

export const sendTxSnap = async ({ funcCall }: SendTxParams) => {
  return snapRpcRequest({
    snapRpcMethod: 'sendTx',
    params: {
      funcCall,
    },
  });
};

/**
 * Invoke the "doge_getAddress" RPC method from the snap.
 */

// export const getAddress = async () => {
//   return '';
// };
export const getAddress = async () => {
  return snapRpcRequest({
    snapRpcMethod: 'getAddress',
  });
};

/**
 * Invoke the "doge_getBalance" RPC method from the snap.
 */

// export const getBalance = async () => {
//   return '';
// };
export const getBalance = async () => {
  return snapRpcRequest({
    snapRpcMethod: 'getBalance',
  });
};

export const makeTransaction = async ({
  toAddress,
  amountInSatoshi,
}: MakeTransactionParams) => {
  return snapRpcRequest({
    snapRpcMethod: 'makeTransaction',
    params: {
      toAddress,
      amountInSatoshi,
    },
  });
};

// export const makeTransaction = async () => {
//   return '';
// };
