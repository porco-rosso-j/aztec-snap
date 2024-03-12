import type {
  ManageStateResult,
  OnRpcRequestHandler,
} from '@metamask/snaps-sdk';
import { divider, heading, panel, text } from '@metamask/snaps-sdk';
// import {
//   ApiParams,
//   ApiRequestParams,
//   ManageStateResult,
// } from '@abstract-crypto/aztec-snap-lib';
import { createAccount, getTx, getAddress, sendTx } from './pxe';
import { getAddressKeyDeriver } from './utils/key-utils';
import { confirmCreateAccount } from './utils';
// import { ApiRequestParams } from '@abstract-crypto/aztec-snap-lib';
import { BIP44AddressKeyDeriver } from '@metamask/key-tree';
import { ApiParams, ApiRequestParams } from './utils/types';
// import { ApiRequestParams } from './utils/types';

// export const onRpcRequest: OnRpcRequestHandler = async ({
//   origin,
//   request,
// }) => {
//   console.log('request: ', request);
//   // const requestParams = request?.params as unknown as ApiRequestParams;
//   // console.log('requestParams: ', requestParams);

//   // let state = await snap.request({
//   //   method: 'snap_manageState',
//   //   params: {
//   //     operation: 'get',
//   //   },
//   // });

//   // console.log('state: ', state);
//   // if (!state) {
//   //   state = {
//   //     accounts: [],
//   //   };

//   //   // initialize state if empty and set default data
//   //   await snap.request({
//   //     method: 'snap_manageState',
//   //     params: {
//   //       operation: 'update',
//   //       newState: state,
//   //     },
//   //   });
//   // }

//   // const apiParams: ApiParams = {
//   //   state,
//   //   requestParams,
//   // };
//   let keyDeriver;
//   switch (request.method) {
//     case 'hello':
//       return snap.request({
//         method: 'snap_dialog',
//         params: {
//           type: 'confirmation',
//           content: panel([
//             text(`Hello, **${origin}**!`),
//             text('This custom confirmation is just for display purposes.'),
//             text(
//               'But you can edit the snap source code to make it do something, if you want to!',
//             ),
//           ]),
//         },
//       });
//     case 'azt_createAccount':
//       // apiParams.keyDeriver = await getAddressKeyDeriver(snap);
//       keyDeriver = await getAddressKeyDeriver(snap);
//     // return createAccount(keyDeriver);

//     // case 'azt_getAddress':
//     //   keyDeriver = await getAddressKeyDeriver(snap);
//     //   return getAddress(apiParams);

//     // case 'azt_getTransactions':
//     //   return getTx();

//     // case 'azt_sendTx':
//     //   keyDeriver = await getAddressKeyDeriver(snap);
//     //   return sendTx(apiParams);

//     default:
//       throw new Error('Method not found.');
//   }
// };

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

  console.log('state: ', state);
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
  // apiParams.keyDeriver = await getAddressKeyDeriver(snap);
  console.log('state: ', apiParams.state);
  console.log('requestParams: ', apiParams.requestParams);
  console.log('requestParams: ', apiParams.state?.accounts);
  // createAccount(apiParams);

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
