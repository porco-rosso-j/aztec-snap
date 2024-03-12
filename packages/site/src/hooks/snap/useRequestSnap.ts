import { defaultSnapOrigin } from '../../utils/constants';
// import type { Snap } from '../../types';
import type { Snap } from '@abstract-crypto/aztec-snap-lib';
import { useMetaMaskContext } from '../../contexts/MetamaskContext';
import { useRequest } from './useRequest';

/**
 * Utility hook to wrap the `wallet_requestSnaps` method.
 *
 * @param snapId - The requested Snap ID. Defaults to the snap ID specified in the
 * config.
 * @param version - The requested version.
 * @returns The `wallet_requestSnaps` wrapper.
 */
export const useRequestSnap = (
  snapId = defaultSnapOrigin,
  version?: string,
) => {
  const { request } = useRequest();
  const { setInstalledSnap } = useMetaMaskContext();

  /**
   * Request the Snap.
   */
  const requestSnap = async () => {
    console.log('snapId in requestSnap: ', snapId);
    console.log('version in requestSnap: ', version);
    const snaps = (await request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: { version },
      },
    })) as Record<string, Snap>;
    console.log('snaps in requestSnap: ', snaps);

    // Updates the `installedSnap` context variable since we just installed the Snap.
    setInstalledSnap(snaps[snapId] ?? null);
  };

  return { requestSnap };
};
