import { AztecAddress, createPXEClient, SentTx } from '@aztec/aztec.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TokenContract } from '@aztec/noir-contracts.js';
import { useState } from 'react';
import { SnapWallet } from '@abstract-crypto/aztec-snap-lib/dest/index';
import { PXE_URL, TOKEN_ADDRESS } from '../utils/constants';
import useBalance from './useBalance';

export const useSendToken = () => {
  const [txHash, setTxHash] = useState<string | undefined>();
  // const { getBalance } = useBalance();
  // const [recipientBalance, setRecipientBalance] = useState<
  //   number | undefined
  // >();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const sendToken = async (
    token: string,
    from: string,
    to: string,
    amount: number,
  ) => {
    if (isLoading) {
      return;
    }

    try {
      setError(undefined);
      setTxHash(undefined);
      setIsLoading(true);

      const pxe = createPXEClient(PXE_URL);

      const wallet = new SnapWallet(pxe);
      const tokenContract = await TokenContract.at(
        AztecAddress.fromString(token),
        wallet,
      );

      console.log('sending: ');
      const sentTx: SentTx = tokenContract.methods
        .transfer_public(
          AztecAddress.fromString(from),
          AztecAddress.fromString(to),
          BigInt(amount), // Fr.fromString() doesn't work
          0,
        )
        .send();

      console.log('sentTx: ', sentTx);

      await sentTx.wait();
      console.log('sent?: ');
      const txHash = await sentTx.getTxHash();
      setTxHash(txHash.toString());

      // const balance = await getBalance(token, from);
      // console.log('balance: ', balance);
    } catch (err: unknown) {
      console.log('err: ', err);
    }
    setIsLoading(false);
  };

  return { txHash, isLoading, error, sendToken };
};
