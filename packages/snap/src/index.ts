import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { getAddress, getBalance, getTx, makeTransaction, sendTx } from './pxe';
import { assertIsSendTxParams, assertIsMakeTransactionParams } from './types';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'azt_getAddress':
      return getAddress();

    case 'azt_getTransactions':
      return getTx();

    case 'azt_getBalance':
      return getBalance();

    case 'azt_makeTransaction':
      assertIsMakeTransactionParams(request.params);
      return makeTransaction(request.params);

    case 'azt_sendTx':
      assertIsSendTxParams(request.params);
      return sendTx(request.params);

    default:
      throw new Error('Method not found.');
  }
};
