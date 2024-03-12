import { useEffect, useState } from 'react';

import { defaultSnapOrigin } from '../../utils/constants';
// import type { GetSnapsResponse } from '../../types';
import type { GetSnapsResponse } from '@abstract-crypto/aztec-snap-lib';
import { useMetaMaskContext } from '../../contexts/MetamaskContext';
import { useRequest } from './useRequest';

/**
 * A Hook to retrieve useful data from MetaMask.
 * @returns The informations.
 */
export const useMetaMask = () => {
  const { provider, setInstalledSnap, installedSnap } = useMetaMaskContext();
  const { request } = useRequest();

  const [isFlask, setIsFlask] = useState(false);
  console.log('isFlask in useMetaMask: ', isFlask);

  const snapsDetected = provider !== null;
  console.log('snapsDetected in useMetaMask: ', snapsDetected);

  /**
   * Detect if the version of MetaMask is Flask.
   */
  const detectFlask = async () => {
    const clientVersion = await request({
      method: 'web3_clientVersion',
    });

    const isFlaskDetected = (clientVersion as string[])?.includes('flask');

    setIsFlask(isFlaskDetected);
  };

  /**
   * Get the Snap informations from MetaMask.
   */
  const getSnap = async () => {
    const snaps = (await request({
      method: 'wallet_getSnaps',
    })) as GetSnapsResponse;
    console.log('snaps: ', snaps);
    setInstalledSnap(snaps[defaultSnapOrigin] ?? null);
  };

  useEffect(() => {
    const detect = async () => {
      if (provider) {
        await detectFlask();
        await getSnap();
      }
    };

    detect().catch(console.error);
  }, [provider]);

  return { isFlask, snapsDetected, installedSnap, getSnap };
};
