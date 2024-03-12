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
  accountAddress: string;
  gasToken: string;
  // player2Address: string;
  // playerId: number;
  // secretNumber: number;
  // gameId: string;
  // playersReady: boolean;
  saveAccountAddress: (address: string) => void;
  saveGasToken: (address: string) => void;
  // savePlayerId: (id: number) => void;
  // saveSecretNumber: (num: number) => void;
  // saveGameId: (id: string) => void;
  // savePlayersReady: (hasJoined: boolean) => void;
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
  const [gasToken, setGasToken] = useState<string>('');
  // const [player2Address, setPlayer2Address] = useState<string>('');
  // const [playerId, setPlayerId] = useState<number>(0);
  // const [secretNumber, setSecretNumber] = useState<number>(0);
  // const [gameId, setGameId] = useState<string>('');

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
    setAccountAddress('');
    setGasToken('');
    localStorage.removeItem(`account_address`);
    localStorage.removeItem(`gas_token_address`);
  };

  const saveAccountAddress = (_accountAddress: string) => {
    setAccountAddress(_accountAddress);
    localStorage.setItem(`account_address`, JSON.stringify(_accountAddress));
  };

  // const savePlayerId = (_id: number) => {
  //   setPlayerId(_id);
  //   localStorage.setItem(`player_id`, JSON.stringify(_id.toString()));
  // };

  // const removePlayerId = () => {
  //   localStorage.removeItem(`player_id`);
  // };

  // const saveSecretNumber = (_num: number) => {
  //   setSecretNumber(_num);
  //   localStorage.setItem(`secret_num`, JSON.stringify(_num.toString()));
  // };

  // const removeSecretNumber = () => {
  //   localStorage.removeItem(`secret_num`);
  // };

  // const saveGameId = (_id: string) => {
  //   setGameId(_id);
  //   localStorage.setItem(`game_id`, JSON.stringify(_id));
  // };

  // const removeGameId = () => {
  //   localStorage.removeItem(`game_id`);
  // };

  // const savePlayersReady = (_hasJoined: boolean) => {
  //   setPlayersReady(_hasJoined);
  // };

  const logout = () => {
    removeAddresses();
    setAccountAddress('');
    // setPlayersReady(false);
    // setPlayerId(0);
    // removePlayerId();
    // setSecretNumber(0);
    // saveGameId('');
    // removeGameId();
    // removeSecretNumber();
  };

  const contextValue: AppContextState = {
    accountAddress,
    gasToken,
    // player2Address,
    // playerId,
    // secretNumber,
    // gameId,
    // playersReady,
    saveGasToken,
    saveAccountAddress,
    // savePlayerId,
    // saveSecretNumber,
    // saveGameId,
    // savePlayersReady,
    logout,
  };
  return (
    <AppContextProvider value={contextValue}>{children}</AppContextProvider>
  );
};
