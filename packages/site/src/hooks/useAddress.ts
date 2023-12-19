import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getPxeAddress } from '@abstract-crypto/aztec-snap-lib/helpers';

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
