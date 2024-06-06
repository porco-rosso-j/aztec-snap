import type { MetaMaskInpageProvider } from '@metamask/providers';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Snap,
  getSnapsProvider,
  detectFlask,
  getSnap,
} from '@abstract-crypto/aztec-snap-lib';

type MetaMaskContextType = {
  provider: MetaMaskInpageProvider | null;
  installedSnap: Snap | null;
  error: Error | null;
  isFlask: boolean | null;
  snapsDetected: boolean | null;
  setInstalledSnap: (snap: Snap | null) => void;
  setError: (error: Error) => void;
  detect: () => void;
};

export const MetaMaskContext = createContext<MetaMaskContextType>({
  provider: null,
  installedSnap: null,
  error: null,
  isFlask: null,
  snapsDetected: null,
  setInstalledSnap: () => {},
  setError: () => {},
  detect: () => {},
});

/**
 * MetaMask context provider to handle MetaMask and snap status.
 *
 * @param props - React Props.
 * @param props.children - React component to be wrapped by the Provider.
 * @returns JSX.
 */
export const MetaMaskProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<MetaMaskInpageProvider | null>(null);
  const [installedSnap, setInstalledSnap] = useState<Snap | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isFlask, setIsFlask] = useState(false);

  const snapsDetected = provider !== null;

  useEffect(() => {
    getSnapsProvider().then(setProvider).catch(console.error);
  }, []);

  const detect = async () => {
    if (provider) {
      const isFlask = await detectFlask();
      setIsFlask(isFlask);

      const installedSnap = await getSnap();
      setInstalledSnap(installedSnap);
    }
  };

  useEffect(() => {
    detect().catch(console.error);
  }, [provider]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 10000);

      return () => {
        clearTimeout(timeout);
      };
    }

    return undefined;
  }, [error]);

  return (
    <MetaMaskContext.Provider
      value={{
        provider,
        error,
        isFlask,
        installedSnap,
        snapsDetected,
        setError,
        setInstalledSnap,
        detect,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

/**
 * Utility hook to consume the MetaMask context.
 *
 * @returns The MetaMask context.
 */
export function useMetaMaskContext() {
  return useContext(MetaMaskContext);
}
