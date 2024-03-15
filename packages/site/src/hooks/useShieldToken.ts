import {
  AztecAddress,
  Fr,
  SentTx,
  computeMessageSecretHash,
} from '@aztec/aztec.js';
import { TokenContract } from '@aztec/noir-contracts.js';
import { useState } from 'react';
import useBalance from './useBalance';
import { useAppContext } from '../contexts/useAppContext';

export const useShieldToken = () => {
  const [shieldTxHash, setTxHash] = useState<string | undefined>();
  const { snapWallet } = useAppContext();
  const { getBalance } = useBalance();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const shieldToken = async (token: string, from: string, amount: number) => {
    if (isLoading || !snapWallet) {
      return;
    }

    try {
      setError(undefined);
      setTxHash(undefined);
      setIsLoading(true);

      const tokenContract = await TokenContract.at(
        AztecAddress.fromString(token),
        snapWallet,
      );

      const secret = Fr.random();
      const secretHash = computeMessageSecretHash(secret);

      console.log('sending: ');
      const sentTx: SentTx = tokenContract.methods
        .shield(AztecAddress.fromString(from), BigInt(amount), secretHash, 0)
        .send();

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

  return { shieldTxHash, isLoading, error, shieldToken };
};
