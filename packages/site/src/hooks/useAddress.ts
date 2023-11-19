import { useEffect, useState } from 'react';
import { getAddress } from '../utils';

export const useAddress = (isSnapInstalled: boolean) => {
  const [address, setAddress] = useState<string | undefined>();

  useEffect(() => {
    if (isSnapInstalled) {
      (async () => {
        console.log('getAddress');
        const addressResponse = await getAddress();
        console.log('addressResponse');
        if (addressResponse) {
          setAddress(addressResponse);
        }
      })();
    }
  }, [isSnapInstalled]);

  return { address };
};
