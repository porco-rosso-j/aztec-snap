import { defaultSnapOrigin } from './constants';
import {
  SendTxParams,
  CreateAuthWitnessParam,
  SnapRpcRequestParams,
  RpcMethodTypes,
  CreateSecretParams,
  RedeemablePendingShield,
  RedeemShieldParams,
  GetPendingShields,
} from './types';

export const snapRpcRequest = async <M extends keyof RpcMethodTypes>(
  args: SnapRpcRequestParams<M>,
) => {
  const result = await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      request: {
        method: `aztec_${args.snapRpcMethod as string}`,
        params: 'params' in args ? args.params : undefined,
      },
      snapId: args.snapId,
    },
  });
  return result as unknown as RpcMethodTypes[M]['output'];
};

/**
 * Invoke the "azte_sendTx" RPC method from the snap.
 */

export const sendTxSnap = async (
  sendTxParams: SendTxParams,
  snapId?: string,
): Promise<string> => {
  try {
    return await snapRpcRequest({
      snapRpcMethod: 'sendTx',
      params: sendTxParams,
      snapId: snapId ? snapId : defaultSnapOrigin,
    });
  } catch (e) {
    console.log('e: ', e);
    return '';
  }
};

/**
 * Invoke the "azt_getAddress" RPC method from the snap.
 */

export const getAddressSnap = async (snapId?: string): Promise<string[]> => {
  try {
    const address = await snapRpcRequest({
      snapRpcMethod: 'accounts',
      snapId: snapId ? snapId : defaultSnapOrigin,
    });
    return address;
  } catch (e) {
    console.log('e: ', e);
    return [];
  }
};

export const createAuthWitnessSnap = async (
  createAuthWitnessParam: CreateAuthWitnessParam,
  snapId?: string,
): Promise<string> => {
  try {
    const wittness = await snapRpcRequest({
      snapRpcMethod: 'createAuthWitness',
      params: createAuthWitnessParam,
      snapId: snapId ? snapId : defaultSnapOrigin,
    });
    return wittness;
  } catch (e) {
    console.log('e: ', e);
    return '';
  }
};

export const createAccountSnap = async (snapId?: string): Promise<string> => {
  try {
    const address = await snapRpcRequest({
      snapRpcMethod: 'createAccount',
      snapId: snapId ? snapId : defaultSnapOrigin,
    });
    return address;
  } catch (e) {
    console.log('e: ', e);
    return '';
  }
};

export const createSecretSnap = async (
  createSecretParams: CreateSecretParams,
  snapId?: string,
): Promise<string> => {
  try {
    const secret = await snapRpcRequest({
      snapRpcMethod: 'createSecret',
      params: createSecretParams,
      snapId: snapId ? snapId : defaultSnapOrigin,
    });
    return secret;
  } catch (e) {
    console.log('e: ', e);
    return '';
  }
};

export const getPendingShieldsSnap = async (
  getPendingShieldsParams: GetPendingShields,
  snapId?: string,
): Promise<RedeemablePendingShield[] | undefined> => {
  try {
    return await snapRpcRequest({
      snapRpcMethod: 'getPendingShields',
      params: getPendingShieldsParams,
      snapId: snapId ? snapId : defaultSnapOrigin,
    });
  } catch (e) {
    console.log('e: ', e);
    return undefined;
  }
};

export const redeemShieldSnap = async (
  redeemShieldParams: RedeemShieldParams,
  snapId?: string,
): Promise<string> => {
  try {
    return await snapRpcRequest({
      snapRpcMethod: 'redeemShield',
      params: redeemShieldParams,
      snapId: snapId ? snapId : defaultSnapOrigin,
    });
  } catch (e) {
    console.log('e: ', e);
    return '';
  }
};
