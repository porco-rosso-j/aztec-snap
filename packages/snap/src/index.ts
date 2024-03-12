import type {
  ManageStateResult,
  OnRpcRequestHandler,
} from '@metamask/snaps-sdk';
import { createAccount, getAddress, sendTx } from './pxe';
import { getAddressKeyDeriver } from './utils/key-utils';
import { ApiParams, ApiRequestParams } from './types';

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  const requestParams = request?.params as unknown as ApiRequestParams;

  let state: ManageStateResult = await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
    },
  });

  if (!state) {
    state = {
      accounts: [],
    };

    // initialize state if empty and set default data
    await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'update',
        newState: state,
      },
    });
  }
  const aztec = await import('@aztec/aztec.js');
  const apiParams: ApiParams = {
    state,
    requestParams,
    aztec,
  };

  console.log('requestParams: ', apiParams.requestParams);
  console.log('requestParams: ', apiParams.state?.accounts);

  switch (request.method) {
    case 'aztec_createAccount':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return createAccount(apiParams);
    case 'aztec_getAddress':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return getAddress(apiParams);

    // case 'aztec_getTransactions':
    //   return getTx();

    case 'aztec_sendTx':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return sendTx(apiParams);
    default:
      throw new Error('Method not found.');
  }
};
