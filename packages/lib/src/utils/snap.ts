import type {
  RpcMethodTypes,
  SendTxParams,
  GetSnapsResponse,
  Snap,
} from '../types/index.js';
import { defaultSnapOrigin } from './constants.js';

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
// export const getSnaps = async (): Promise<GetSnapsResponse> => {
//   return (await window.ethereum.request({
//     method: 'wallet_getSnaps',
//   })) as unknown as GetSnapsResponse;
// };

// export const getSnaps = async (): Promise<boolean> => {
//   try {
//     await window.ethereum.request({
//       method: 'wallet_getSnaps',
//     });
//     return true;
//   } catch (e) {
//     return false;
//   }
// };

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
// export const connectSnap = async (
//   snapId: string = defaultSnapOrigin,
//   params: Record<'version' | string, unknown> = {},
// ) => {
//   await window.ethereum.request({
//     method: 'wallet_requestSnaps',
//     params: {
//       [snapId]: params,
//     },
//   });
// };

// export const getSnap = async (version?: string): Promise<Snap | undefined> => {
//   try {
//     const snaps = await getSnaps();
//     console.log('');

//     return Object.values(snaps).find(
//       (snap) =>
//         snap.id === defaultSnapOrigin && (!version || snap.version === version),
//     );
//   } catch (e) {
//     console.log('Failed to obtain installed snap', e);
//     return undefined;
//   }
// };

// export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');

type SnapRpcRequestParams<M extends keyof RpcMethodTypes> =
  RpcMethodTypes[M]['input'] extends undefined
    ? { snapRpcMethod: M }
    : { snapRpcMethod: M; params: RpcMethodTypes[M]['input'] };

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

// export const createAccountSnap = async (): Promise<string | undefined> => {
//   try {
//     const address = snapRpcRequest({
//       snapRpcMethod: 'createAccount',
//     });
//     return address;
//   } catch (e) {
//     console.log('e: ', e);
//     return undefined;
//   }
// };

// export const createAccountSnap = async (): Promise<string | undefined> => {
//   try {
//     // const address = snapRpcRequest({
//     //   snapRpcMethod: 'createAccount',
//     // });
//     const result = await window.ethereum.request({
//       method: 'wallet_invokeSnap',
//       params: {
//         snapId: defaultSnapOrigin,
//         request: {
//           method: `azt_createAccount`,
//         },
//       },
//     });
//     return result as string;
//   } catch (e) {
//     console.log('e: ', e);
//     return undefined;
//   }
// };

// export const getAddressSnap = async (): Promise<string | undefined> => {
//   const address = (await window.ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: {
//       snapId : defaultSnapOrigin,
//       request: {
//         method: 'azt_getAddress',
//       },
//     },
//   })) as string;
//   return address;
// };
