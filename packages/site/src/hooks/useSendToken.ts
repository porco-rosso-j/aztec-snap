import { AztecAddress } from '@aztec/aztec.js';
import { TokenContract } from '@aztec/noir-contracts.js';
import { useState } from 'react';
import { useBalance } from './useBalance';
import { useAppContext } from '../contexts/useAppContext';

export const useSendToken = () => {
  const [sendTxHash, setTxHash] = useState<string | undefined>();
  const { snapWallet } = useAppContext();
  const { getBalance } = useBalance();
  const [isLoading, setIsLoading] = useState(false);
  const [sendLoadingId, setSendLoadingId] = useState(0);
  const [error, setError] = useState<string | undefined>();

  const sendToken = async (
    token: string,
    from: string,
    to: string,
    amount: number,
    pub: boolean,
  ) => {
    if (!snapWallet) {
      return;
    }

    try {
      setError(undefined);
      setTxHash(undefined);
      setIsLoading(true);
      setSendLoadingId(pub ? 1 : 2);

      const tokenContract = await TokenContract.at(
        AztecAddress.fromString(token),
        snapWallet,
      );

      console.log('sending: ');
      let sentTx;
      if (pub) {
        sentTx = tokenContract.methods
          .transfer_public(
            AztecAddress.fromString(from),
            AztecAddress.fromString(to),
            BigInt(amount), // Fr.fromString() doesn't work
            0,
          )
          .send();
      } else {
        sentTx = tokenContract.methods
          .transfer(
            AztecAddress.fromString(from),
            AztecAddress.fromString(to),
            BigInt(amount), // Fr.fromString() doesn't work
            0,
          )
          .send();
      }

      console.log('sentTx: ', sentTx);

      await sentTx.wait();
      console.log('sent?: ');
      const txHash = await sentTx.getTxHash();
      console.log('txHash: ', txHash);
      setTxHash(txHash.toString());

      const balance = await getBalance(token, from);
      console.log('balance: ', balance);
    } catch (err: unknown) {
      console.log('err: ', err);
    }
    setIsLoading(false);
  };

  return { sendTxHash, isLoading, sendLoadingId, error, sendToken };
};
