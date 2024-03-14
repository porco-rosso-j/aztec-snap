import type { SnapWallet } from '@abstract-crypto/aztec-snap-lib';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

const AppContext = createContext<AppContextState | null>(null);

export const AppContextProvider = AppContext.Provider;

interface AppContextState {
  snapWallet: SnapWallet | null;
  gasToken: string;
  saveGasToken: (address: string) => void;
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
  const [gasToken, setGasToken] = useState<string>('');

  useEffect(() => {
    if (!gasToken) {
      const token = localStorage.getItem(`gas_token_address`);
      console.log('gas_token_address: ', token);
      if (token) {
        setGasToken(JSON.parse(token));
      }
    }
  });

  const saveGasToken = (_gasToken: string) => {
    setGasToken(_gasToken);
    localStorage.setItem(`gas_token_address`, JSON.stringify(_gasToken));
  };

  const removeAddresses = () => {
    setGasToken('');
    localStorage.removeItem(`gas_token_address`);
  };

  const logout = () => {
    removeAddresses();

    // setPlayersReady(false);
    // setPlayerId(0);
    // removePlayerId();
    // setSecretNumber(0);
    // saveGameId('');
    // removeGameId();
    // removeSecretNumber();
  };

  const contextValue: AppContextState = {
    snapWallet,
    gasToken,
    saveGasToken,
    logout,
  };
  return (
    <AppContextProvider value={contextValue}>{children}</AppContextProvider>
  );
};
