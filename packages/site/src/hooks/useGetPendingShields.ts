import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/useAppContext';
import { RedeemablePendingShield } from '@abstract-crypto/aztec-snap-lib';

export const useGetPendingShields = () => {
  const { gasToken, snapWallet } = useAppContext();
  const [pendingShields, setPendingShields] = useState<
    RedeemablePendingShield[] | undefined
  >(undefined);

  console.log('pendingShields: ', pendingShields);

  const fetchPendingShields = async () => {
    if (snapWallet) {
      const response = await snapWallet.getPendingShields(
        snapWallet.getAddress().toString(),
        gasToken,
      );
      setPendingShields(response);
    }
  };

  useEffect(() => {
    fetchPendingShields();
  }, [snapWallet, gasToken]);

  return {
    pendingShields,
    fetchPendingShields,
  };
};
