/* eslint-disable jsdoc/require-jsdoc */
import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';

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
): Promise<boolean> {
  return (await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Confirm transaction'),
        divider(),
        text('Send tx from:'),
        copyable(from),
        text('Send tx to :'),
        copyable(to),
      ]),
    },
  })) as boolean;
}
