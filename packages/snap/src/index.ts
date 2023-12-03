import { OnRpcRequestHandler } from '@metamask/snaps-types';
// import {
//   getAddress,
//   getBalance,
//   getTransactions,
//   makeTransaction,
// } from './rpc';
import { getAddress, getAztBalance, getTx, makeTransaction } from './pxe';
import { assertIsMakeTransactionParams } from './types';
// eslint-disable-next-line import/no-unassigned-import
// import './worker-registration';

// export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
//   switch (request.method) {
//     case 'doge_getAddress':
//       return getAddress();

//     case 'doge_getTransactions':
//       return getTransactions();

//     case 'doge_getBalance':
//       return getBalance();

//     case 'doge_makeTransaction':
//       assertIsMakeTransactionParams(request.params);
//       return makeTransaction(request.params);

//     default:
//       throw new Error('Method not found.');
//   }
// };

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'azt_getAddress':
      return getAddress();

    case 'azt_getTransactions':
      return getTx();

    case 'azt_getBalance':
      return getAztBalance();

    case 'azt_makeTransaction':
      assertIsMakeTransactionParams(request.params);
      return makeTransaction(request.params);

    default:
      throw new Error('Method not found.');
  }
};
