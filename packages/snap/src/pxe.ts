import {
  init,
  createPXEClient,
  PXE,
  getSandboxAccountsWallets,
  AztecAddress,
} from '@aztec/aztec.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TokenContract } from '@aztec/noir-contracts/types';
// import { TokenContract } from '@aztec/noir-contracts';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
import { MakeTransactionParams, SendTxParams } from './types';
import { PXE_URL, TOKEN_ADDRESS } from './constants';

// eslint-disable-next-line jsdoc/require-jsdoc
export const getAddress = async (): Promise<string> => {
  const pxe = createPXEClient(PXE_URL);
  console.log('pxe: ', pxe);
  await init();
  const accountWallets = await getSandboxAccountsWallets(pxe);
  console.log('accountWallets: ', accountWallets);
  const aztecAddress = await accountWallets[0].getAddress();
  console.log('aztecAddress: ', aztecAddress);
  const adminAddr = aztecAddress.toString();
  console.log('adminAddr: ', adminAddr);
  return adminAddr;
};

export const getTx = async (): Promise<any[]> => {
  // https://docs.aztec.network/apis/pxe/interfaces/pxe#viewtx
  // pxe.viewTx(functionName, args, to, from?)
  // need unconstrained balance fetch func?
  return [0];
};

export const getBalance = async (): Promise<number> => {
  const pxe = createPXEClient(PXE_URL);
  console.log('pxe: ', pxe);
  await init();
  const accountWallets = await getSandboxAccountsWallets(pxe);
  const aztecAddress = await accountWallets[0].getAddress();

  // https://github.com/porco-rosso-j/aztec_lend/blob/34e70cbc335222413c2edba1bae0a424a33288f1/src/scripts/cross-chain.ts#L436
  const l2tokenContract = await TokenContract.at(
    AztecAddress.fromString(TOKEN_ADDRESS),
    accountWallets[0],
  );

  console.log('l2tokenContract: ', l2tokenContract);

  const balance = await l2tokenContract.methods
    .balance_of_public(aztecAddress)
    .view({ from: aztecAddress });
  console.log('balance: ', balance);

  return Number(balance);
};

type txResponse = {
  txId: string;
};

export const sendTx = async ({ funcCall }: SendTxParams): Promise<any> => {
  console.log('funcCall: ', funcCall);
  const confirmationResponse = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Confirm transaction'),
        divider(),
        text('Send the tx to :'),
        copyable(funcCall.to.toString()),
        text('Function selector:'),
        copyable(funcCall.functionData.selector.toString()),
      ]),
    },
  });

  if (confirmationResponse !== true) {
    throw new Error('Transaction must be approved by user');
  }

  const pxe: PXE = createPXEClient(PXE_URL);
  console.log('pxe: ', pxe);

  await init();
  const accountWallet = (await getSandboxAccountsWallets(pxe))[0];
  console.log('accountWallets: ', accountWallet);

  const txRequest = await accountWallet.createTxExecutionRequest([funcCall]);

  const simulatedTx = await accountWallet.simulateTx(txRequest, true);
  const txHash = await accountWallet.sendTx(simulatedTx);
  const res: txResponse = { txId: '' };
  res.txId = txHash.toString();
  return res;
};

export const makeTransaction = async ({
  toAddress,
  amountInSatoshi,
}: MakeTransactionParams): Promise<any> => {
  console.log('toAddress: ', toAddress);
  console.log('amountInSatoshi: ', amountInSatoshi);

  const amount = amountInSatoshi;
  const confirmationResponse = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Confirm transaction'),
        divider(),
        text('Send the following amount:'),
        copyable(amount.toString()),
        text('To the following address:'),
        copyable(toAddress),
      ]),
    },
  });

  if (confirmationResponse !== true) {
    throw new Error('Transaction must be approved by user');
  }

  const pxe = createPXEClient(PXE_URL);
  console.log('pxe: ', pxe);

  await init();
  const accountWallets = await getSandboxAccountsWallets(pxe);
  console.log('accountWallets: ', accountWallets);
  const aztecAddress = await accountWallets[0].getAddress();
  const recipient = AztecAddress.fromString(toAddress);

  const l2tokenContract = await TokenContract.at(
    AztecAddress.fromString(TOKEN_ADDRESS),
    accountWallets[0],
  );

  console.log('l2tokenContract: ', l2tokenContract);

  const tx = await l2tokenContract.methods
    .transfer_public(aztecAddress, recipient, amountInSatoshi, 0)
    .send();

  const response = await tx.wait();
  console.log('response: ', response);
  console.log('tx hash: ', response.txHash.toString());
  const res: txResponse = { txId: '' };
  res.txId = response.txHash.toString();
  console.log('res: ', res);

  return res;
};
