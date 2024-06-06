import { useEffect, useState } from 'react';
import { Box, Text, Group, Stack } from '@mantine/core';
import { shortenAddress } from '../utils';
import { useBalance, useAddress, useGetL2Tokens } from '../hooks';
import { CopyButtonIcon, ManageToken, Faucet, TokenList } from '../components';
import { Token } from '@abstract-crypto/aztec-snap-lib';

type WalletProps = {
  isDarkTheme: boolean;
};

export function Wallet(props: WalletProps) {
  const { l2Tokens, fetchTokens, updateTokenBalances } = useGetL2Tokens();
  const { address } = useAddress();
  const [selectedTokenId, setSelectedTokenId] = useState(0);
  const [token, setToken] = useState<Token | null>(null);
  const { getL2Balance } = useBalance();
  const [isManageTokenOpen, setIsManageTokenOpen] = useState(false);

  const handleOpenManageToken = (open: boolean, tokenId: number) => {
    setSelectedTokenId(tokenId);
    setIsManageTokenOpen(open);
  };

  useEffect(() => {
    if (l2Tokens.length !== 0) {
      setToken(l2Tokens[selectedTokenId]);
    }
  }, [l2Tokens, selectedTokenId]);

  console.log('l2Tokens: ', l2Tokens);

  const handleShowBalance = (pub: boolean): string => {
    let balance = '0';
    let symbol = '';
    if (token) {
      const _balance = pub ? token.pubBalance : token.priBalance;
      if (_balance) {
        balance = (_balance / 10 ** token.decimals).toFixed(2);
      }
      symbol = token.symbol ? token.symbol : 'ETH';
    }

    return balance + ' ' + symbol;
  };

  const textTextStyle = {
    color: props.isDarkTheme ? 'white' : 'black',
    TextAlign: 'center',
  };

  return (
    <>
      <Box
        style={{
          maxWidth: '650px',
          height: '650px',
          padding: '50px',
          margin: 'auto',
          marginTop: '3.5rem',
          marginBottom: '1.5rem',
          boxShadow: 'rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem',
          borderRadius: '1.37rem',
          backgroundColor: props.isDarkTheme ? '#2E213E' : 'white',
          background: props.isDarkTheme
            ? 'radial-gradient(at center bottom, #2E213E, #412E4D)'
            : 'radial-gradient(at center bottom, #FFFFFF, #F2F0FF)',
        }}
      >
        <Stack align="center" gap="md">
          <Stack gap={1}>
            <Group>
              <Text mr={-5} style={textTextStyle} size="lg">
                {address ? shortenAddress(address) : 'No Address Found'}
              </Text>
              <CopyButtonIcon address={address} />
            </Group>
          </Stack>
          <Stack align="center" mt={15} gap={3}>
            <Group gap={50}>
              <Stack align="center">
                <Text mb={-15} style={{ ...textTextStyle, opacity: '50%' }}>
                  public balance
                </Text>
                <Text style={{ ...textTextStyle, fontSize: '35px' }} size="xl">
                  {handleShowBalance(true)}
                </Text>
              </Stack>
              <Stack align="center">
                <Text mb={-15} style={{ ...textTextStyle, opacity: '50%' }}>
                  private balance
                </Text>
                <Text style={{ ...textTextStyle, fontSize: '35px' }} size="xl">
                  {handleShowBalance(false)}
                </Text>
              </Stack>
            </Group>
          </Stack>
          {token && isManageTokenOpen ? (
            <ManageToken
              isDarkTheme={props.isDarkTheme}
              token={token}
              address={address}
              updateTokenBalances={updateTokenBalances}
              handleOpenManageToken={handleOpenManageToken}
            />
          ) : (
            <TokenList
              isDarkTheme={props.isDarkTheme}
              tokens={l2Tokens}
              handleOpenManageToken={handleOpenManageToken}
            />
          )}
        </Stack>
      </Box>
      <Faucet
        address={address}
        tokens_len={l2Tokens.length}
        getBalance={getL2Balance}
        updateTokenBalances={updateTokenBalances}
        fetchTokens={fetchTokens}
      />
    </>
  );
}
