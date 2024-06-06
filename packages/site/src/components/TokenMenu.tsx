import { Image, Menu, Button } from '@mantine/core';
import { ETH, L1Token, WETH, l1Tokens } from '../utils';
import { ChevronDown } from 'tabler-icons-react';
import { useEffect, useState } from 'react';

type TokenMenuProps = {
  token: L1Token;
  isDeposit: boolean;
  isDarkTheme: boolean;
  handleTokenChange: (l1Token: L1Token) => void;
};

export function TokenMenu(props: TokenMenuProps) {
  const [tokens, setTokens] = useState<L1Token[]>(l1Tokens);

  useEffect(() => {
    if (props.isDeposit && tokens[0].symbol === 'ETH') {
      // deposit
      const newTokens = [WETH, ...tokens.slice(1)];
      setTokens(newTokens);

      if (props.token.symbol === 'ETH') {
        props.handleTokenChange(WETH);
      }
    } else if (!props.isDeposit && tokens[0].symbol === 'WETH') {
      // withdraw
      const newTokens = [ETH, ...tokens.slice(1)];
      setTokens(newTokens);

      if (props.token.symbol === 'WETH') {
        props.handleTokenChange(ETH);
      }
    }
  }, [props.isDeposit]);

  return (
    <Menu width={100} position="right-start">
      <Menu.Target>
        <Button
          size="lg"
          variant="transparent"
          style={{
            color: props.isDarkTheme ? 'white' : 'black',
            backgroundColor: 'trasnsparent',
          }}
          rightSection={<ChevronDown size={25} />}
        >
          {
            <Image
              w={40}
              src={
                props.isDeposit
                  ? props.token.icon
                  : props.token.symbol == 'WETH'
                  ? ETH.icon
                  : props.token.icon
              }
            />
          }
        </Button>
      </Menu.Target>
      <Menu.Dropdown style={{ width: '100px' }}>
        {tokens.map((tk) => (
          <Menu.Item
            key={tk.symbol}
            onClick={() => props.handleTokenChange(tk)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <span>{tk.symbol}</span>
              <Image src={tk.icon} style={{ width: 20, height: 20 }} />
            </div>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
