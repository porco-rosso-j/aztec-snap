import { Box, Button, Divider, Group, Image, Stack, Text } from '@mantine/core';
import { useState } from 'react';

import { IconMinus, IconPlus } from '@tabler/icons-react';
import { ToggleLeft, ToggleRight } from 'tabler-icons-react';
import { Token } from '@abstract-crypto/aztec-snap-lib';
import { tokenIcons } from '../utils';

type TokenListProps = {
  isDarkTheme: boolean;
  tokens: Token[];
  handleOpenManageToken: (open: boolean, id: number) => void;
};

export function TokenList(props: TokenListProps) {
  const [isPubBal, setIsPubBal] = useState(true);

  const handleClickToken = (id: number) => {
    props.handleOpenManageToken(true, id);
  };

  const textColor = props.isDarkTheme ? 'white' : 'black';
  const textStyle = {
    color: textColor,
    fontSize: '14px',
  };

  const showBalance = (
    pubBal: number | undefined,
    priBal: number | undefined,
    decimals: number,
  ): string => {
    if (isPubBal && pubBal) {
      return (pubBal / 10 ** decimals).toFixed(2);
    } else if (!isPubBal && priBal) {
      return (priBal / 10 ** decimals).toFixed(2);
    } else {
      return '0';
    }
  };

  return (
    <Box py={20} style={{ minWidth: '350px' }}>
      <Group
        px={15}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Text c={textColor}>Assets</Text>
        {isPubBal ? (
          <ToggleLeft
            size={'25px'}
            color={props.isDarkTheme ? 'white' : 'black'}
            onClick={() => setIsPubBal(false)}
          />
        ) : (
          <ToggleRight
            size={'25px'}
            color={props.isDarkTheme ? 'white' : 'black'}
            onClick={() => setIsPubBal(true)}
          />
        )}
      </Group>
      <Divider my={10} color={textColor} />
      <Text
        c={textColor}
        mr={15}
        size="xs"
        opacity={'50%'}
        style={{ textAlign: 'right' }}
      >
        {isPubBal ? 'public balance' : 'private balance'}
      </Text>
      <Stack
        align="center"
        mt={10}
        style={{ maxHeight: '260px', overflowY: 'auto' }}
      >
        {props.tokens.length !== 0 ? (
          props.tokens.map((token: Token, index: number) => (
            <Box
              key={token.symbol}
              pr={15}
              pl={5}
              py={15}
              style={{
                width: '330px',
                boxShadow: 'black',
                borderRadius: '5px',
                borderColor: textColor,
                borderWidth: '1px',
                borderStyle: 'solid',
                cursor: 'pointer',
              }}
              onClick={() => handleClickToken(index)}
            >
              <Group
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Group
                  gap={10}
                  pr={15}
                  pl={10}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {<Image w={20} src={tokenIcons[token.symbol]} />}
                  <Text
                    style={{
                      color: textColor,
                      fontSize: '16px',
                    }}
                  >
                    {token.name}
                  </Text>
                </Group>
                <Text
                  style={{
                    color: textColor,
                    fontSize: '15px',
                  }}
                >
                  {showBalance(
                    token.pubBalance,
                    token.priBalance,
                    token.decimals,
                  )}{' '}
                  {token.symbol}
                </Text>
              </Group>
            </Box>
          ))
        ) : (
          <Text mt={10} c={textColor} style={{ textAlign: 'center' }}>
            No Token Found...
          </Text>
        )}
        <Stack gap={-10} mt={10} ml={10} style={{ justifyContent: 'left' }}>
          <Group>
            <IconPlus style={textStyle} />
            <Button
              ml={-25}
              style={{
                ...textStyle,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              Import a token
            </Button>
          </Group>
          <Group>
            <IconMinus style={textStyle} />
            <Button
              onClick={() => {
                // removeTokens();
              }}
              ml={-25}
              style={{
                ...textStyle,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              Remove tokens
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Box>
  );
}
