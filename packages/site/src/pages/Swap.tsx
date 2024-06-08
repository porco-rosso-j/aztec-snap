import { useState } from 'react';
import {
  Box,
  Text,
  Stack,
  Button,
  TextInput,
  Menu,
  Image,
} from '@mantine/core';
import { ArrowsDownUp, ChevronDown } from 'tabler-icons-react';
import { L1Token, l1Tokens } from '../utils';
import { MainBoxStyle } from '../styles/styles';

type SwapProps = {
  isDarkTheme: boolean;
};
export function Swap(props: SwapProps) {
  const [sellToken, setSellToken] = useState<L1Token | null>(null);
  const [buyToken, setBuyToken] = useState<L1Token | null>(null);
  const [sellTokenAmount, setSellTokenAmount] = useState<number>(0);
  const [buyTokenAmount, setBuyTokenAmount] = useState<number>(0);

  const [txHash, setTxHash] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSellTokenChange = (token: L1Token) => {
    setSellToken(token);
  };

  const handleBuyTokenChange = (token: L1Token) => {
    setBuyToken(token);
  };

  const swapDirection = () => {
    setSellToken(buyToken);
    setBuyToken(sellToken);
  };

  const textTextStyle = {
    color: props.isDarkTheme ? 'white' : 'black',
    TextAlign: 'center',
  };

  return (
    <>
      <Box style={MainBoxStyle(props.isDarkTheme)}>
        <Stack
          align="center"
          justify="space-between"
          gap="md"
          style={{ height: '500px' }}
        >
          <Text style={textTextStyle} size="30px">
            Swap
          </Text>
          <Stack align="center">
            <TextInput
              label={`Sell`}
              variant="filled"
              style={{
                width: '350px',
                backgroundColor: 'transparent',
              }}
              labelProps={{
                style: {
                  color: props.isDarkTheme ? 'white' : 'black',
                  marginBottom: '5px',
                },
              }}
              placeholder="0.00"
              radius="md"
              size="lg"
              onChange={(event) =>
                setSellTokenAmount(Number(event.currentTarget.value))
              }
              rightSection={
                <div>
                  <Menu width={50} position="right-start">
                    <Menu.Target>
                      <Button
                        size="md"
                        pr={40}
                        variant="transparent"
                        style={{
                          color: props.isDarkTheme ? 'white' : 'black',
                          backgroundColor: 'trasnsparent',
                        }}
                        rightSection={<ChevronDown size={10} color="black" />}
                      >
                        {sellToken ? (
                          <Image w={25} src={sellToken!.icon} sizes="15px" />
                        ) : null}
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown style={{ width: '100px' }}>
                      {l1Tokens.map((tk) => (
                        <Menu.Item
                          key={tk.symbol}
                          onClick={() => handleSellTokenChange(tk)}
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
                            <Image
                              src={tk.icon}
                              style={{ width: 20, height: 20 }}
                            />
                          </div>
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                </div>
              }
            />
            <Button
              onClick={swapDirection}
              variant="subtle"
              size="md"
              color="transparent"
            >
              <ArrowsDownUp
                size={20}
                color={props.isDarkTheme ? 'white' : 'black'}
              />
            </Button>
            <TextInput
              label={`Buy`}
              variant="filled"
              mt={-20}
              style={{
                width: '350px',
                backgroundColor: 'transparent',
              }}
              labelProps={{
                style: {
                  color: props.isDarkTheme ? 'white' : 'black',
                  marginBottom: '5px',
                },
              }}
              placeholder="0.00"
              radius="md"
              size="lg"
              onChange={(event) =>
                setBuyTokenAmount(Number(event.currentTarget.value))
              }
              rightSection={
                <div>
                  <Menu width={50} position="right-start">
                    <Menu.Target>
                      <Button
                        size="md"
                        pr={40}
                        variant="transparent"
                        style={{
                          color: props.isDarkTheme ? 'white' : 'black',
                          backgroundColor: 'trasnsparent',
                        }}
                        rightSection={<ChevronDown size={10} color="black" />}
                      >
                        {buyToken ? (
                          <Image w={25} src={buyToken!.icon} sizes="15px" />
                        ) : null}
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown style={{ width: '100px' }}>
                      {l1Tokens.map((tk) => (
                        <Menu.Item
                          key={tk.symbol}
                          onClick={() => handleBuyTokenChange(tk)}
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
                            <Image
                              src={tk.icon}
                              style={{ width: 20, height: 20 }}
                            />
                          </div>
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                </div>
              }
            />
          </Stack>
          <Button
            color="#633BA0"
            size="md"
            disabled={false}
            onClick={() => {
              setErrorMessage('');
              if (buyToken && sellTokenAmount) {
                // handleRedeemToken();
                setErrorMessage('Batch redeem not supported yet');
              } else {
                setErrorMessage('Inputs not defined');
              }
            }}
          >
            Swap
          </Button>
        </Stack>
      </Box>
    </>
  );
}
