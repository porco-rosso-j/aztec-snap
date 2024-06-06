import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/useAppContext';
import { Token as L2Token } from '@abstract-crypto/aztec-snap-lib';

export const useGetL2Tokens = () => {
  const { snapWallet, l2TokensStorage, saveL2TokensStorage } = useAppContext();
  const [l2Tokens, setL2Tokens] = useState<L2Token[]>([]);

  // TODO: place default eth when len == 0
  const fetchTokens = async () => {
    console.log('fetchTokens: ');
    if (!snapWallet) return;
    let l2tokens: L2Token[] = await snapWallet.getTokens();
    console.log('fetchTokens done ');
    if (l2tokens.length == 0) return;
    l2tokens = sortArray(l2tokens);

    setL2Tokens(l2tokens);
    saveL2TokensStorage(l2tokens);
  };

  const updateTokenBalances = async (tokens: string[]) => {
    if (!snapWallet || l2Tokens.length == 0) return;

    let l2tokens: L2Token[] = await snapWallet.updateBalances(
      snapWallet.getAddress().toString(),
      tokens,
      tokens.length == 0,
    );

    l2tokens = sortArray(l2tokens);

    setL2Tokens(l2tokens);
    saveL2TokensStorage(l2tokens);
  };

  // find eth and place it at the index 0
  function sortArray(l2tokens: L2Token[]): L2Token[] {
    const ethIndex = l2tokens.findIndex(
      (t) => t.name === 'Ethereum' && t.symbol == 'ETH',
    );

    let ethElement = l2tokens[ethIndex];
    l2tokens.splice(ethIndex, 1);
    l2tokens.unshift(ethElement);

    return l2tokens;
  }

  useEffect(() => {
    if (l2Tokens.length == 0 && l2TokensStorage.length != 0) {
      setL2Tokens(l2TokensStorage);
      // TODO: make this periodical
      // fetchTokens();
    }


    const intervalId = setInterval(fetchTokens, 30000);
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [l2Tokens, l2TokensStorage]);

  return {
    l2Tokens,
    fetchTokens,
    updateTokenBalances,
  };
};
