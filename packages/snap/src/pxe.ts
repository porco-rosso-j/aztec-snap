import {
  init,
  createPXEClient,
  PXE,
  Contract,
  GrumpkinScalar,
  getSandboxAccountsWallets,
  SchnorrAccountContract,
  AccountManager,
  AztecAddress,
} from '@aztec/aztec.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TokenContract } from '@aztec/noir-contracts/types';
// import { TokenContract } from '@aztec/noir-contracts';
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
import { MakeTransactionParams } from './types';
import { PXE_URL, TOKEN_ADDRESS } from './constants';
// const pk = 0x2153536ff6628eee01cf4024889ff977a18d9fa61d0e414422f7681cf085c281;
// const encryptionPrivateKey = new GrumpkinScalar(new Fr(pk).fromS);
// const encryptionPrivateKey: GrumpkinScalar = GrumpkinScalar.random();

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

export const getAztBalance = async (): Promise<number> => {
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

type txResponse = {
  txId: string;
};
