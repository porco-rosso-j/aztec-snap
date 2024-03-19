import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/useAppContext';
import { RedeemablePendingShield } from '@abstract-crypto/aztec-snap-lib';

export const useGetPendingShields = (token: string) => {
  const { snapWallet } = useAppContext();
  const [pendingShields, setPendingShields] = useState<
    RedeemablePendingShield[] | undefined
  >(undefined);

  console.log('pendingShields: ', pendingShields);

  const fetchPendingShields = async () => {
    if (snapWallet) {
      const response = await snapWallet.getPendingShields(
        snapWallet.getAddress().toString(),
        token,
      );
      setPendingShields(response);
    }
  };

  useEffect(() => {
    fetchPendingShields();
  }, [snapWallet, token]);

  return {
    pendingShields,
    fetchPendingShields,
  };
};
