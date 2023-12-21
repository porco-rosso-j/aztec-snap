import { OnRpcRequestHandler } from '@metamask/snaps-types';
import {
  ApiParams,
  ApiRequestParams,
  SnapState,
} from '@abstract-crypto/aztec-snap-lib';
import { createAccount, getAddress, getTx, sendTx } from './pxe';
import { getAddressKeyDeriver } from './utils/key-utils';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const requestParams = request?.params as unknown as ApiRequestParams;

  let state: SnapState = await snap.request({
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

  const apiParams: ApiParams = {
    state,
    requestParams,
  };

  switch (request.method) {
    case 'azt_createAccount':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return createAccount(apiParams);

    case 'azt_getAddress':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return getAddress(apiParams);

    case 'azt_getTransactions':
      return getTx();

    case 'azt_sendTx':
      // assertIsSendTxParams(request.params);
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return sendTx(apiParams);

    default:
      throw new Error('Method not found.');
  }
};
