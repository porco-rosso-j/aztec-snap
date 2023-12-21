import { useEffect, useState } from 'react';
import {
  getAddressSnap,
  createAccountSnap,
} from '@abstract-crypto/aztec-snap-lib';

export const useAddress = (isSnapInstalled: boolean) => {
  const [address, setAddress] = useState<string | undefined>();

  useEffect(() => {
    if (isSnapInstalled) {
      (async () => {
        try {
          const addressResponse = await getAddressSnap();
          if (addressResponse) {
            setAddress(addressResponse);
          }
        } catch (e) {
          console.log('e: ', e);
        }
      })();
    }
  }, [isSnapInstalled]);

  const createAccount = async () => {
    try {
      const addressResponse = await createAccountSnap();
      if (addressResponse) {
        setAddress(addressResponse);
      }
    } catch (e) {
      console.log('e: ', e);
    }
  };

  return { address, createAccount };
};
