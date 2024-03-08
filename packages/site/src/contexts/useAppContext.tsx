import { createContext, useContext, useState, ReactNode } from 'react';

const AppContext = createContext<AppContextState | null>(null);

export const AppContextProvider = AppContext.Provider;

interface AppContextState {
  accountAddress: string;
  player1Address: string;
  player2Address: string;
  playerId: number;
  secretNumber: number;
  gameId: string;
  playersReady: boolean;
  saveAccountAddress: (address: string) => void;
  savePlayer1Address: (address: string) => void;
  savePlayer2Address: (address: string) => void;
  savePlayerId: (id: number) => void;
  saveSecretNumber: (num: number) => void;
  saveGameId: (id: string) => void;
  savePlayersReady: (hasJoined: boolean) => void;
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
  const [accountAddress, setAccountAddress] = useState<string>('');
  const [player1Address, setPlayer1Address] = useState<string>('');
  const [player2Address, setPlayer2Address] = useState<string>('');
  const [playerId, setPlayerId] = useState<number>(0);
  const [secretNumber, setSecretNumber] = useState<number>(0);
  const [gameId, setGameId] = useState<string>('');
  const [playersReady, setPlayersReady] = useState<boolean>(false);

  const savePlayer1Address = (_player1_address: string) => {
    setPlayer1Address(_player1_address);
    localStorage.setItem(`player1_address`, JSON.stringify(_player1_address));
  };

  const savePlayer2Address = (_player2_address: string) => {
    setPlayer2Address(_player2_address);
    localStorage.setItem(`player2_address`, JSON.stringify(_player2_address));
  };

  const removeAddresses = () => {
    setPlayer1Address('');
    setPlayer2Address('');
    setAccountAddress('');
    localStorage.removeItem(`player1_address`);
    localStorage.removeItem(`player2_address`);
    localStorage.removeItem(`contract_address`);
  };

  const saveAccountAddress = (_accountAddress: string) => {
    setAccountAddress(_accountAddress);
    localStorage.setItem(`contract_address`, JSON.stringify(_accountAddress));
  };

  const savePlayerId = (_id: number) => {
    setPlayerId(_id);
    localStorage.setItem(`player_id`, JSON.stringify(_id.toString()));
  };

  const removePlayerId = () => {
    localStorage.removeItem(`player_id`);
  };

  const saveSecretNumber = (_num: number) => {
    setSecretNumber(_num);
    localStorage.setItem(`secret_num`, JSON.stringify(_num.toString()));
  };

  const removeSecretNumber = () => {
    localStorage.removeItem(`secret_num`);
  };

  const saveGameId = (_id: string) => {
    setGameId(_id);
    localStorage.setItem(`game_id`, JSON.stringify(_id));
  };

  const removeGameId = () => {
    localStorage.removeItem(`game_id`);
  };

  const savePlayersReady = (_hasJoined: boolean) => {
    setPlayersReady(_hasJoined);
  };

  const logout = () => {
    removeAddresses();
    setAccountAddress('');
    setPlayersReady(false);
    setPlayerId(0);
    removePlayerId();
    setSecretNumber(0);
    saveGameId('');
    removeGameId();
    removeSecretNumber();
  };

  const contextValue: AppContextState = {
    accountAddress,
    player1Address,
    player2Address,
    playerId,
    secretNumber,
    gameId,
    playersReady,
    savePlayer1Address,
    savePlayer2Address,
    saveAccountAddress,
    savePlayerId,
    saveSecretNumber,
    saveGameId,
    savePlayersReady,
    logout,
  };
  return (
    <AppContextProvider value={contextValue}>{children}</AppContextProvider>
  );
};
