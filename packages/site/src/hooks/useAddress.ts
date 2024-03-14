import { useEffect, useState } from 'react';
import { SnapWallet, getAddressSnap } from '@abstract-crypto/aztec-snap-lib';
import { useMetaMaskContext } from '../contexts/MetamaskContext';

export const useAddress = () => {
  const { installedSnap } = useMetaMaskContext();
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
    // const addressResponse = await invokeSnap({
    //   method: 'aztec_getAddress',
    //   params: [],
    // });
    // const addressResponse = await getAddressSnap();
    const addressResponse = await getAddressSnap('1');
    if (addressResponse) {
      setAddress(addressResponse);
      return addressResponse;
    }
  };

  return { address, getAddress };
};
