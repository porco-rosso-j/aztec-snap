import { init, AztecAddress, createPXEClient, SentTx } from '@aztec/aztec.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TokenContract } from '@aztec/noir-contracts/types';
import { useState } from 'react';
// import {  } from '../utils';
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SnapWallet } from '@abstract-crypto/aztec-snap-lib/helpers';
// import { makeTransaction, sendTxSnap } from '../utils';

export const PXE_URL = 'http://localhost:8080';
export const TOKEN_ADDRESS =
  '0x1acaf802b574911d610eb70d30eb70a22656146a17a4805d675909eee2a19344';
const sender =
  '0x06357cc85cb8fc561adbf741f63cd75efa26ffba1c80d431ec77d036d8edf022';

export const useSendAZT = () => {
  const [lastTxId, setLastTxId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const sendAZT = async (data: FormData) => {
    if (isLoading) {
      return;
    }

    try {
      setError(undefined);
      setLastTxId(undefined);
      setIsLoading(true);
      const toAddress = data.get('toAddress');
      const amount = data.get('amountInDoge');

      console.log('1');
      if (typeof toAddress === 'string' && typeof amount === 'string') {
        const pxe = createPXEClient(PXE_URL);
        console.log('pxe: ', pxe);
        console.log('2');

        await init();

        const wallet = new SnapWallet(pxe);
        const token = await TokenContract.at(
          AztecAddress.fromString(TOKEN_ADDRESS),
          wallet,
        );
        console.log('token: ', token);
        console.log('3');

        const sentTx: SentTx = await token.methods
          .transfer_public(
            AztecAddress.fromString(sender),
            AztecAddress.fromString(toAddress),
            Number(amount), // Fr.fromString() doesn't work
            0,
          )
          .send();
        console.log('sentTx: ', sentTx);
        const res = await sentTx.wait();
        console.log('res: ', res);

        const txHash = await sentTx.getTxHash();
        console.log('txhash.: ', txHash.toString());
        setLastTxId(txHash.toString());
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError(`An unknown error occurred: ${JSON.stringify(err)}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { lastTxId, isLoading, error, sendAZT };
};
