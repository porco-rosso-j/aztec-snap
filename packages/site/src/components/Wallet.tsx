import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Group,
  Stack,
  CopyButton,
  ActionIcon,
  rem,
  Tooltip,
} from '@mantine/core';
import { IconCheck, IconCopy, IconCopyCheck } from '@tabler/icons-react';
import { TokenWithBalance, shortenAddress } from '../utils';
import { useBalance, useAddress, useGetTokens } from '../hooks';
import { ManageToken, Faucet, TokenList } from '.';
import { IconTooltip } from '@tabler/icons-react';
import { CopyButtonIcon } from './CopyButtonIcon';

type WalletProps = {
  isDarkTheme: boolean;
};

export default function Wallet(props: WalletProps) {
  const { tokens, fetchTokens, updateTokenBalance } = useGetTokens();
  const { address } = useAddress();
  const [selectedTokenId, setSelectedTokenId] = useState(0);
  const [token, setToken] = useState<TokenWithBalance | undefined>(undefined);
  const { getBalance } = useBalance();
  const [isManageTokenOpen, setIsManageTokenOpen] = useState(false);

  const handleOpenManageToken = (open: boolean, tokenId: number) => {
    setSelectedTokenId(tokenId);
    setIsManageTokenOpen(open);
  };

  useEffect(() => {
    if (tokens.length !== 0) {
      setToken(tokens[selectedTokenId]);
    }
  }, [tokens, selectedTokenId]);

  const textTextStyle = {
    color: props.isDarkTheme ? 'white' : 'black',
    TextAlign: 'center',
  };
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
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
                  {token
                    ? token.pubBalance + ' ' + token.symbol
                    : 0 + ' ' + 'TKN'}
                </Text>
              </Stack>
              <Stack align="center">
                <Text mb={-15} style={{ ...textTextStyle, opacity: '50%' }}>
                  private balance
                </Text>
                <Text style={{ ...textTextStyle, fontSize: '35px' }} size="xl">
                  {token
                    ? token.priBalance + ' ' + token.symbol
                    : 0 + ' ' + 'TKN'}
                </Text>
              </Stack>
            </Group>
          </Stack>
          {token && isManageTokenOpen ? (
            <ManageToken
              isDarkTheme={props.isDarkTheme}
              token={token}
              address={address}
              updateTokenBalance={updateTokenBalance}
              handleOpenManageToken={handleOpenManageToken}
            />
          ) : (
            <TokenList
              isDarkTheme={props.isDarkTheme}
              tokens={tokens}
              handleOpenManageToken={handleOpenManageToken}
            />
          )}
        </Stack>
      </Box>
      <Faucet
        address={address}
        tokens_len={tokens.length}
        getBalance={getBalance}
        updateTokenBalance={updateTokenBalance}
        fetchTokens={fetchTokens}
      />
    </>
  );
}
