import { init, AztecAddress, createPXEClient, SentTx } from '@aztec/aztec.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TokenContract } from '@aztec/noir-contracts/types';
import { useState } from 'react';
import { SnapWallet } from '@abstract-crypto/aztec-snap-lib';
import { PXE_URL, TOKEN_ADDRESS } from '../utils/constants';
import { getBalance } from './useBalance';

export const useSendETH = () => {
  const [lastTxId, setLastTxId] = useState<string | undefined>();
  const [recipientBalance, setRecipientBalance] = useState<
    number | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const sendETH = async (data: FormData, from: string) => {
    if (isLoading) {
      return;
    }

    try {
      setError(undefined);
      setLastTxId(undefined);
      setIsLoading(true);
      const toAddress = data.get('toAddress');
      const amount = data.get('amount');

      if (typeof toAddress === 'string' && typeof amount === 'string') {
        const pxe = createPXEClient(PXE_URL);

        await init();

        const wallet = new SnapWallet(pxe);
        const token = await TokenContract.at(
          AztecAddress.fromString(TOKEN_ADDRESS),
          wallet,
        );

        const sentTx: SentTx = await token.methods
          .transfer_public(
            AztecAddress.fromString(from),
            AztecAddress.fromString(toAddress),
            Number(amount), // Fr.fromString() doesn't work
            0,
          )
          .send();

        await sentTx.wait();
        const txHash = await sentTx.getTxHash();
        setLastTxId(txHash.toString());

        const balance = await getBalance(toAddress);
        setRecipientBalance(balance);
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

  return { lastTxId, recipientBalance, isLoading, error, sendETH };
};
