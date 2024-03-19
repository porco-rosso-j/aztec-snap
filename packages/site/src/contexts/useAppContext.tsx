import type { SnapWallet } from '@abstract-crypto/aztec-snap-lib';
import { createContext, useContext, useState, ReactNode } from 'react';

const AppContext = createContext<AppContextState | null>(null);

export const AppContextProvider = AppContext.Provider;

interface AppContextState {
  snapWallet: SnapWallet | null;
  saveSnapWallet: (snapWallet: SnapWallet) => void;
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

  const saveSnapWallet = (_snapWallet: SnapWallet) => {
    setSnapWallet(_snapWallet);
  };

  const logout = () => {
    setSnapWallet(null);
  };

  const contextValue: AppContextState = {
    snapWallet,
    saveSnapWallet,
    logout,
  };
  return (
    <AppContextProvider value={contextValue}>{children}</AppContextProvider>
  );
};
