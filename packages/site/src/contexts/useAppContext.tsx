import type { SnapWallet, Token } from '@abstract-crypto/aztec-snap-lib';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
// import { Signer } from 'viem';
import { Signer } from 'ethers';
import { L1TransactSdk } from '@shieldswap/l1-transact';

const AppContext = createContext<AppContextState | null>(null);

export const AppContextProvider = AppContext.Provider;

interface AppContextState {
  snapWallet: SnapWallet | null;
  metamaskWallet: Signer | null;
  bridgeSDK: L1TransactSdk | null;
  l2TokensStorage: Token[];
  saveSnapWallet: (snapWallet: SnapWallet) => void;
  saveMetamaskWallet: (metamaskWallet: Signer) => void;
  saveBridgeSDK: (bridgeSDK: L1TransactSdk) => void;
  saveL2TokensStorage: (l2Tokens: Token[]) => void;
  logout: () => void;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};

interface AppContextProps {
  children: ReactNode;
}

export const AppContextProviderComponent: React.FC<AppContextProps> = ({
  children,
}) => {
  const [snapWallet, setSnapWallet] = useState<SnapWallet | null>(null);
  const [metamaskWallet, setMetamaskWallet] = useState<Signer | null>(null);
  const [bridgeSDK, setBridgeSDK] = useState<L1TransactSdk | null>(null);
  const [l2TokensStorage, setL2TokensStorage] = useState<Token[]>([]);

  console.log('context snapWallet: ', snapWallet);

  useEffect(() => {
    if (l2TokensStorage.length == 0) {
      const _tokens = localStorage.getItem('l2_tokens');
      const tokens = _tokens ? JSON.parse(_tokens) : [];
      if (tokens.length != 0) {
        setL2TokensStorage(tokens);
      }
    }
  }, [l2TokensStorage]);

  const saveL2TokensStorage = (_l2Tokens: Token[]) => {
    setL2TokensStorage(_l2Tokens);
    localStorage.setItem(`l2_tokens`, JSON.stringify(_l2Tokens));
  };

  const saveBridgeSDK = (_bridgeSDK: L1TransactSdk) => {
    setBridgeSDK(_bridgeSDK);
  };

  const saveSnapWallet = (_snapWallet: SnapWallet) => {
    setSnapWallet(_snapWallet);
  };

  const saveMetamaskWallet = (_metamaskWallet: Signer) => {
    setMetamaskWallet(_metamaskWallet);
  };

  const logout = () => {
    setSnapWallet(null);
    setMetamaskWallet(null);
    setBridgeSDK(null);
    setL2TokensStorage([]);
    localStorage.removeItem(`l2_tokens`);
  };

  const contextValue: AppContextState = {
    snapWallet,
    metamaskWallet,
    bridgeSDK,
    l2TokensStorage,
    saveSnapWallet,
    saveMetamaskWallet,
    saveBridgeSDK,
    saveL2TokensStorage,
    logout,
  };
  return (
    <AppContextProvider value={contextValue}>{children}</AppContextProvider>
  );
};
