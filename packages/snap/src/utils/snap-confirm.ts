/* eslint-disable jsdoc/require-jsdoc */
//@ts-ignore
import { copyable, divider, heading, panel, text } from '@metamask/snaps-sdk';

export async function confirmCreateAccount(): Promise<boolean> {
  return (await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Create a new Aztec Account'),
        divider(),
        text('Account Type: ECDSA'),
        divider(),
        text(
          'Private key controlling your new account will be generated from the seed phrase stored in this Metamask Flask.',
        ),
      ]),
    },
  })) as boolean;
}

export async function confirmSendTx(
  from: string,
  to: string,
  data: string,
): Promise<boolean> {
  return (await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Confirm transaction'),
        divider(),
        text('Sender Address:'),
        copyable(from),
        text('Contract Address:'),
        copyable(to),
        text('Function Data:'),
        copyable(data),
      ]),
    },
  })) as boolean;
}

export async function confirmCreateAuthWitness(
  from: string,
  message: string,
): Promise<boolean> {
  return (await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Create AuthWitness'),
        divider(),
        text('Sender Address:'),
        copyable(from),
        text('Message:'),
        copyable(message),
      ]),
    },
  })) as boolean;
}

export async function confirmRedeemShield(
  from: string,
  to: string,
  amount: string,
): Promise<boolean> {
  return (await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Redeem Shield'),
        divider(),
        text('Sender Address:'),
        copyable(from),
        text('Token Address:'),
        copyable(to),
        text('Amount:'),
        copyable(amount),
      ]),
    },
  })) as boolean;
}
