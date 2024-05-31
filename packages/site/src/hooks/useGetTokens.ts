import { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/useAppContext';
import { Token } from '@abstract-crypto/aztec-snap-lib';
import { useBalance } from '.';
import { TokenWithBalance } from '../utils';

export const useGetTokens = () => {
  const { snapWallet } = useAppContext();
  const [tokens, setTokens] = useState<TokenWithBalance[]>([]);
  const { getBalance } = useBalance();

  const fetchTokens = async () => {
    if (snapWallet) {
      const tokens: Token[] = await snapWallet.getTokens(
        snapWallet.getAddress().toString(),
      );

      if (tokens.length == 0) return;

      let tokensWithBalance: TokenWithBalance[] = [];
      for (let i = 0; i < tokens.length; i++) {
        let token: TokenWithBalance = {
          address: tokens[i].address,
          name: tokens[i].name,
          symbol: tokens[i].symbol,
          decimal: tokens[i].decimal,
        };

        const balance = await getBalance(
          token.address,
          snapWallet.getAddress().toString(),
        );
        console.log('balance in getoken: ', balance);
        token.pubBalance = isNaN(balance[0]) ? 0 : balance[0];
        token.priBalance = isNaN(balance[1]) ? 0 : balance[1];

        tokensWithBalance.push(token);
      }

      setTokens(tokensWithBalance);
    }
  };

  const updateTokenBalance = async (tokenAddress: string) => {
    const tokenId = tokens.findIndex((token) => token.address == tokenAddress);
    console.log('tokenId: ', tokenId);
    if (!snapWallet) return;
    const tempTokens = [...tokens];
    console.log('tempTokens: ', tempTokens);
    const token = tokens[tokenId];

    console.log('token: ', token);
    const balance = await getBalance(
      token.address,
      snapWallet.getAddress().toString(),
    );
    token.pubBalance = isNaN(balance[0]) ? 0 : balance[0];
    token.priBalance = isNaN(balance[1]) ? 0 : balance[1];

    tempTokens[tokenId] = token;
    setTokens(tempTokens);
  };

  useEffect(() => {
    fetchTokens();
  }, [snapWallet]);

  return {
    tokens,
    fetchTokens,
    updateTokenBalance,
  };
};
