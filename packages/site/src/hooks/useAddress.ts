import { useEffect, useState } from 'react';
import { useInvokeSnap, useMetaMask } from './snap';

export const useAddress = () => {
  const { installedSnap } = useMetaMask();
  const { invokeSnap } = useInvokeSnap();
  const [address, setAddress] = useState<string>('');
  console.log('address: ', address);

  useEffect(() => {
    if (installedSnap && !address) {
      (async () => {
        try {
          await getAddress();
        } catch (e) {
          console.log('e: ', e);
        }
      })();
    }
  }, [installedSnap, address]);

  const getAddress = async () => {
    const addressResponse = await invokeSnap({
      method: 'aztec_getAddress',
      params: [],
    });
    if (addressResponse) {
      setAddress(addressResponse);
      return addressResponse;
    }
  };

  return { address, getAddress };
};
