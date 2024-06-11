import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Stack,
  Button,
  TextInput,
  Center,
  Group,
} from '@mantine/core';
import { useAddress, useBalance, useBridge, useGetL2Tokens } from '../hooks';
import { ArrowsDownUp } from 'tabler-icons-react';
import { L1Token, l1Tokens } from '../utils';
import { useMetaMaskContext, useAppContext } from '../contexts';
import { BrowserProvider } from 'ethers';
import { TokenMenu } from '../components';
import { MainBoxStyle } from '../styles/styles';

type BridgeProps = {
  isDarkTheme: boolean;
};

export function Bridge(props: BridgeProps) {
  const { address } = useAddress();
  const { getL1TokenBalance } = useBalance();

  const { snapWallet, metamaskWallet, saveMetamaskWallet } = useAppContext();
  const { provider } = useMetaMaskContext();
  const { getL1Tokens, bridgeAssetToL2, bridgeAssetToL1 } = useBridge();

  const [isDeposit, setIsDeposit] = useState(true);
  const { l2Tokens } = useGetL2Tokens();
  const [l1Token, setL1Token] = useState<L1Token>(l1Tokens[0]);
  const [L1TokenBalance, setL1TokenBalance] = useState<number>(0);
  const [L2TokenBalance, setL2TokenBalance] = useState<number>(0);

  const [bridgeInputAmount, setBridgeInputAmount] = useState<number>(0);
  const [bridgeOutputAmount, setBridgeOutputAmount] = useState<number>(0);

  const [txHash, setTxHash] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [faucetClicked, setFacuetClicked] = useState(false);

  async function handleTokensFaucet() {
    setErrorMessage('');

    setFacuetClicked(true);
    if (address) {
      await getL1Tokens();
    } else {
      setErrorMessage('address not found');
    }
    setFacuetClicked(false);
  }

  const handleTokenChange = (l1Token: L1Token) => {
    setL1Token(l1Token);
  };

  const handleBridgeAsset = async () => {
    setLoading(true);
    if (isDeposit) {
      if (bridgeInputAmount <= L1TokenBalance) {
        await bridgeAssetToL2(l1Token, bridgeInputAmount);
        setL1TokenBalance(L1TokenBalance - bridgeInputAmount);
        setL2TokenBalance(L2TokenBalance + bridgeInputAmount);
      }
    } else {
      if (bridgeInputAmount <= L2TokenBalance) {
        await bridgeAssetToL1(l1Token, bridgeInputAmount);
        setL2TokenBalance(L2TokenBalance - bridgeInputAmount);
        setL1TokenBalance(L1TokenBalance + bridgeInputAmount);
      }
    }
    setLoading(false);
  };

  const bridgeDirection = () => {
    setIsDeposit(!isDeposit);
  };

  useEffect(() => {
    const getMMClient = async () => {
      if (!metamaskWallet && provider) {
        const browserProvider = new BrowserProvider(provider);
        const mmSigner = await browserProvider.getSigner();

        saveMetamaskWallet(mmSigner);
      }
    };

    getMMClient();
  }, [metamaskWallet, provider]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (isDeposit && metamaskWallet && l1Token.address) {
        const l1Address = await metamaskWallet.getAddress();
        const balance = await getL1TokenBalance(l1Token.address, l1Address);
        console.log('balance ss: ', balance);
        setL1TokenBalance(balance);
      } else if (!isDeposit && snapWallet) {
        const l2Token = l2Tokens.find((t) => t.name == l1Token.name);
        if (l2Token && l2Token.priBalance) {
          const balance = l2Token.priBalance / 10 ** l2Token.decimals;
          setL2TokenBalance(balance);
        } else {
          setL2TokenBalance(0);
        }
      }
    };
    fetchBalance();
  }, [isDeposit, l1Token, l2Tokens]);

  const textTextStyle = {
    color: props.isDarkTheme ? 'white' : 'black',
    TextAlign: 'center',
  };

  return (
    <>
      <Box style={MainBoxStyle(props.isDarkTheme)}>
        <Stack
          h={450}
          align="center"
          justify="space-between"
          style={{ height: '500px' }}
        >
          <Text mt={50} ml={15} style={textTextStyle} size="30px">
            {`From  ${isDeposit ? 'Ethereum' : 'Aztec'}  to  ${
              isDeposit ? 'Aztec' : 'Ethereum'
            }`}
            {
              <Button
                ml={-15}
                onClick={() => bridgeDirection()}
                variant="transparent"
                size="md"
                color="transparent"
              >
                <ArrowsDownUp
                  size={25}
                  color={props.isDarkTheme ? '#80daeb' : 'black'}
                />
              </Button>
            }
          </Text>
          <TokenMenu
            token={l1Token}
            isDeposit={isDeposit}
            isDarkTheme={props.isDarkTheme}
            handleTokenChange={handleTokenChange}
          />
          <Box style={{ width: '350px', position: 'relative' }}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '5px',
              }}
            >
              <Text
                size="14px"
                mb={5}
                mr={5}
                style={{
                  color: props.isDarkTheme ? 'white' : 'black',
                  cursor: 'pointer',
                }}
                onClick={() => setBridgeInputAmount(L1TokenBalance)}
              >{`Max: ${isDeposit ? L1TokenBalance : L2TokenBalance} ${
                l1Token.symbol
              }`}</Text>
            </Box>
            <TextInput
              variant="filled"
              style={{
                width: '350px',
                backgroundColor: 'transparent',
              }}
              error={
                isDeposit ? (
                  L1TokenBalance < bridgeInputAmount
                ) : L2TokenBalance < bridgeInputAmount ? (
                  <Text size="12px">amount exceeds balance</Text>
                ) : null
              }
              defaultValue={0}
              value={bridgeInputAmount != 0 ? bridgeInputAmount : ''}
              placeholder="0.00"
              radius="md"
              size="lg"
              onChange={(event) => {
                setBridgeInputAmount(Number(event.currentTarget.value));
              }}
              rightSection={
                <div
                  style={{
                    color: 'black',
                    marginRight: '20px',
                  }}
                >
                  {l1Token.symbol}
                </div>
              }
            />
            <Stack mt={20} mx={10} gap="xs">
              <Group
                align="stretch"
                justify="space-between"
                style={{
                  width: '100%', // Ensure the group takes the full width of its container
                }}
              >
                <Text
                  size="14px"
                  style={{
                    color: props.isDarkTheme ? 'white' : 'black',
                  }}
                >
                  - Fees:
                </Text>
                <Text
                  size="14px"
                  style={{
                    color: props.isDarkTheme ? 'white' : 'black',
                  }}
                >
                  {/* {(bridgeInputAmount / 1000).toFixed(2)} {l1Token.symbol} */}
                  {0} {l1Token.symbol}
                </Text>
              </Group>
              <Group
                align="stretch"
                justify="space-between"
                style={{
                  width: '100%', // Ensure the group takes the full width of its container
                }}
              >
                <Text
                  size="14px"
                  style={{
                    color: props.isDarkTheme ? 'white' : 'black',
                  }}
                >
                  - Est. Receive:
                </Text>
                <Text
                  size="14px"
                  style={{
                    color: props.isDarkTheme ? 'white' : 'black',
                  }}
                >
                  {/* {((bridgeInputAmount * 999) / 1000).toFixed(2)}{' '} */}
                  {bridgeInputAmount.toFixed(2)} {l1Token.symbol}
                </Text>
              </Group>
            </Stack>
          </Box>

          <Button
            color="#633BA0"
            size="md"
            disabled={loading}
            loading={loading}
            onClick={() => {
              setErrorMessage('');
              console.log('bridgeInputAmount: ', bridgeInputAmount);
              if (isDeposit) {
                if (
                  bridgeInputAmount != 0 &&
                  bridgeInputAmount <= L1TokenBalance
                ) {
                  handleBridgeAsset();
                } else if (bridgeInputAmount > L1TokenBalance) {
                  setErrorMessage('Amount exceeds balance');
                }
              } else {
                console.log('1');
                if (
                  bridgeInputAmount != 0 &&
                  bridgeInputAmount <= L2TokenBalance
                ) {
                  console.log('2');
                  handleBridgeAsset();
                } else if (bridgeInputAmount > L2TokenBalance) {
                  setErrorMessage('Amount exceeds balance');
                }
              }
            }}
          >
            {isDeposit ? 'Deposit' : 'Withdraw'}
          </Button>
        </Stack>
      </Box>

      <>
        <Center mt={30}>
          <Stack>
            <Text
              size="md"
              style={{
                color: faucetClicked ? 'white' : 'grey',
                textDecoration: 'underline',
                cursor: 'pointer',
                textAlign: 'center',
              }}
              onClick={() => handleTokensFaucet()}
            >
              Get L1 Tokens Faucet
            </Text>
            {errorMessage && <Text c="red">{errorMessage}</Text>}
          </Stack>
        </Center>
      </>
    </>
  );
}
