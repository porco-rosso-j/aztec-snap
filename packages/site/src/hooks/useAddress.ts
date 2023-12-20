import { useEffect, useState } from 'react';
import { getPxeAddress } from '@abstract-crypto/aztec-snap-lib';

export const useAddress = (isSnapInstalled: boolean) => {
  const [address, setAddress] = useState<string | undefined>();

  useEffect(() => {
    if (isSnapInstalled) {
      (async () => {
        console.log('getAddress');
        const addressResponse = await getPxeAddress();
        console.log('addressResponse');
        if (addressResponse) {
          setAddress(addressResponse);
        }
      })();
    }
  }, [isSnapInstalled]);

  return { address };
};
