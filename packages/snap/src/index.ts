import {
  text,
  type ManageStateResult,
  type OnInstallHandler,
  type OnRpcRequestHandler,
  panel,
  OnHomePageHandler,
  divider,
  InternalError,
  row,
  address,
} from '@metamask/snaps-sdk';
import {
  createAccount,
  createAuthWitness,
  getAddress,
  sendTx,
  createSecretHash,
  getRedeemablePendingShields,
  redeemShield,
  getBalance,
} from './rpc';
import { getAddressKeyDeriver } from './utils';
import { Account, ApiParams, ApiRequestParams } from './types';

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
      tokens: [],
      transactions: [],
      secrets: [],
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
    case 'aztec_getBalance':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return getBalance(apiParams);
    case 'aztec_accounts':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return getAddress(apiParams);
    case 'aztec_createAuthWitness':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return createAuthWitness(apiParams);
    case 'aztec_sendTx':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return sendTx(apiParams);
    case 'aztec_createSecretHash':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return createSecretHash(apiParams);
    case 'aztec_getPendingShields':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return getRedeemablePendingShields(apiParams);
    case 'aztec_redeemShield':
      apiParams.keyDeriver = await getAddressKeyDeriver(snap);
      return redeemShield(apiParams);

    // generateSecret
    // addNote
    // addTokens
    // getTokens
    // getPendingShields
    // getBalance
    // redeem_shield

    default:
      throw new Error('Method not found.');
  }
};

export const onInstall: OnInstallHandler = async () => {
  const component = panel([
    text('Your MetaMask wallet is now compatible with Aztec Sandbox!'),
    text(
      `To manage your Aztec account and send and receive funds, visit the [companion dapp for Starknet](${'http://localhost:5173'}).`,
    ),
  ]);

  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: component,
    },
  });
};

export const onHomePage: OnHomePageHandler = async () => {
  const panelItems = [];
  try {
    const state: ManageStateResult = await snap.request({
      method: 'snap_manageState',
      params: {
        operation: 'get',
      },
    });

    const accounts: Account[] = state?.accounts as Account[];

    if (accounts[0]) {
      const account = accounts[0];
      const userAddress = account.address;
      panelItems.push(
        row('Address', address(`${userAddress}` as `0x${string}`)),
      );

      panelItems.push(divider());
      panelItems.push(
        text(
          `Visit the [companion dapp for Starknet](${'http://localhost:5173'}) to manage your account.`,
        ),
      );
    } else {
      panelItems.push(
        text(`**Your Starknet account is not yet deployed or recovered.**`),
      );
      panelItems.push(
        text(
          `Initiate a transaction to create your Starknet account. Visit the [companion dapp for Starknet](${'http://localhost:5173'}) to get started.`,
        ),
      );
    }
    return {
      content: panel(panelItems),
    };
  } catch (err) {
    throw new InternalError(err);
  }
};
