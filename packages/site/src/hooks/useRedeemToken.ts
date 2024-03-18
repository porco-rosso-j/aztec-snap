import { useState } from 'react';
import { useBalance } from './useBalance';
import { useAppContext } from '../contexts/useAppContext';

export const useRedeemToken = () => {
  const [redeemTxHash, setTxHash] = useState<string | undefined>();
  const { snapWallet } = useAppContext();
  const { getBalance } = useBalance();
  const [isRedeemLoading, setIsLoading] = useState(false);
  const [redeemLoadingId, setRedeemLoadingId] = useState(0);
  const [error, setError] = useState<string | undefined>();

  const redeemToken = async (
    token: string,
    from: string,
    amount: number,
    index: number,
  ) => {
    if (isRedeemLoading || !snapWallet) {
      return;
    }

    try {
      setError(undefined);
      setTxHash(undefined);
      setIsLoading(true);
      setRedeemLoadingId(index);

      const pendingShields = await snapWallet.getPendingShields(from, token);
      console.log('pendingShields: ', pendingShields);

      if (pendingShields) {
        const txHash = await snapWallet.redeemShield(
          from,
          token,
          amount,
          index,
        );
        console.log('txHash: ', txHash);
        setTxHash(txHash);
      }

      const balance = await getBalance(token, from);
      console.log('balance: ', balance);
    } catch (err: unknown) {
      console.log('err: ', err);
    }
    setIsLoading(false);
  };

  return {
    redeemTxHash,
    isRedeemLoading,
    error,
    redeemLoadingId,
    redeemToken,
  };
};
