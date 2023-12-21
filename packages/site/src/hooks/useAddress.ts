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
        console.log('fetchAddress');
        try {
          const addressResponse = await getAddressSnap();
          console.log('addressResponse');
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
    console.log('createAccount');
    try {
      const addressResponse = await createAccountSnap();
      console.log('addressResponse');
      if (addressResponse) {
        setAddress(addressResponse);
      }
    } catch (e) {
      console.log('e: ', e);
    }
  };

  return { address, createAccount };
};
