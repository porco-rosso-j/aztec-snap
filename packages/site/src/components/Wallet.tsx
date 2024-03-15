import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextInput,
  Text,
  Group,
  Stack,
  Center,
  Anchor,
  Tabs,
} from '@mantine/core';
import { shortenAddress, shortenTxHash } from '../utils/shortenAddr';
import { IconCopy, IconCopyCheck } from '@tabler/icons-react';
import useFaucet from '../hooks/useFaucet';
import useBalance from '../hooks/useBalance';
import { useAddress, useSendToken } from '../hooks';
import { useAppContext } from '../contexts/useAppContext';
import { useShieldToken } from '../hooks/useShieldToken';

type WalletProps = {
  isDarkTheme: boolean;
};

export default function Wallet(props: WalletProps) {
  const { gasToken } = useAppContext();
  const { address } = useAddress();
  const { getFaucet } = useFaucet();
  const { balance, privateBalance, setBalance, getBalance, setPrivateBalance } =
    useBalance();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  console.log('gasToken: ', gasToken);
  console.log('address: ', address);

  const [txHash, setTxHash] = useState<string>('');
  const { sendTxHash, loadingId, sendToken } = useSendToken();
  const { shieldTxHash, shieldToken } = useShieldToken();

  useEffect(() => {
    if (sendTxHash && txHash !== sendTxHash) {
      setTxHash(sendTxHash);
    }

    if (shieldTxHash && txHash !== shieldTxHash) {
      setTxHash(shieldTxHash);
    }
  }, [sendTxHash, shieldTxHash]);

  const [sendAmount, setSendAmount] = useState<number>(0);
  const [recepient, setRecepient] = useState<string>('');
  const [faucetClicked, setFacuetClicked] = useState(false);

  async function handleFaucet(pub: boolean) {
    setFacuetClicked(true);
    if (address) {
      const token = await getFaucet(address, pub);
      const balance = await getBalance(token, address);
      if (pub) {
        setBalance(balance[0]);
      } else {
        setPrivateBalance(balance[1]);
      }
    } else {
      console.log('address not found');
    }
    setFacuetClicked(false);
  }

  async function handleSendToken(pub: boolean) {
    setLoading(true);
    if (address) {
      await sendToken(gasToken, address, recepient, sendAmount, pub);
      const balance = await getBalance(gasToken, address);
      setBalance(balance[0]);
    } else {
      console.log('address not set');
    }
    setLoading(false);
  }

  async function handleShieldToken() {
    setLoading(true);
    if (address) {
      await shieldToken(gasToken, address, sendAmount);
      const balance = await getBalance(gasToken, address);
      setBalance(balance[1]);
    } else {
      console.log('address not set');
    }
    setLoading(false);
  }

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
          padding: '50px',
          margin: 'auto',
          marginTop: '3.5rem',
          marginBottom: '1.5rem',
          boxShadow: 'rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem',
          borderRadius: '1.37rem',
          backgroundColor: props.isDarkTheme ? '#402F51' : 'white',
        }}
      >
        {/* <Onboard address={address} getAddress={getAddress} /> */}
        <Stack align="center" gap="md">
          <Stack gap={1}>
            <Group>
              <Text style={textTextStyle} size="lg">
                {address ? shortenAddress(address) : 'No Address Found'}
              </Text>
              {!copied ? (
                <IconCopy
                  onClick={handleCopy}
                  color={props.isDarkTheme ? 'white' : 'gray'}
                  size={'18px'}
                />
              ) : (
                <IconCopyCheck
                  color={props.isDarkTheme ? 'gray' : 'black'}
                  size={'18px'}
                />
              )}
            </Group>
          </Stack>
          <Stack align="center" mt={15} gap={3}>
            {/* <Text style={textTextStyle} size="lg">
              Current Balances
            </Text> */}
            <Group gap={50}>
              <Stack align="center">
                <Text mb={-15} style={{ ...textTextStyle, opacity: '50%' }}>
                  public balance
                </Text>
                <Text style={{ ...textTextStyle, fontSize: '35px' }} size="xl">
                  {balance ? balance : 0} GAS
                </Text>
              </Stack>
              <Stack align="center">
                <Text mb={-15} style={{ ...textTextStyle, opacity: '50%' }}>
                  private balance
                </Text>
                <Text style={{ ...textTextStyle, fontSize: '35px' }} size="xl">
                  {privateBalance ? privateBalance : 0} GAS
                </Text>
              </Stack>
            </Group>
          </Stack>
          <Tabs mt={10} defaultValue={'send'}>
            <Tabs.List mb={30} style={{ justifyContent: 'center' }}>
              <Tabs.Tab
                value="send"
                style={{ width: '50%', backgroundColor: 'transparent' }}
              >
                <Text style={{ ...textTextStyle, fontSize: '20px' }}>Send</Text>
              </Tabs.Tab>
              <Tabs.Tab
                value="shield"
                style={{ width: '50%', backgroundColor: 'transparent' }}
              >
                <Text style={{ ...textTextStyle, fontSize: '20px' }}>
                  Shield
                </Text>
              </Tabs.Tab>
            </Tabs.List>
            <Stack mt={20} align="center" style={{ boxShadow: '1rm' }}>
              <Text
                mr={220}
                mb={-10}
                style={{
                  fontSize: '12px',
                  color: props.isDarkTheme ? 'white' : 'gray',
                }}
              >
                recipient address
              </Text>
              <TextInput
                style={{
                  width: '350px',
                  backgroundColor: 'transparent',
                }}
                variant="filled"
                radius="md"
                placeholder="0x123.."
                size="sm"
                onChange={(event) => setRecepient(event.currentTarget.value)}
              />
              <Text
                mr={280}
                mb={-10}
                style={{
                  fontSize: '12px',
                  color: props.isDarkTheme ? 'white' : 'gray',
                }}
              >
                amount
              </Text>
              <TextInput
                style={{
                  width: '350px',
                  backgroundColor: 'transparent',
                }}
                variant="filled"
                radius="md"
                placeholder="0.01"
                size="sm"
                onChange={(event) =>
                  setSendAmount(Number(event.currentTarget.value))
                }
              />

              <Tabs.Panel value="send">
                <Group gap={30}>
                  <Button
                    mt={30}
                    color="#3B77A0"
                    size="md"
                    loading={loading && loadingId == 1}
                    disabled={loading}
                    onClick={() => {
                      setErrorMessage('');
                      if (address && gasToken && sendAmount) {
                        handleSendToken(true);
                      } else {
                        setErrorMessage('Inputs not defined');
                      }
                    }}
                  >
                    Send Public
                  </Button>
                  <Button
                    mt={30}
                    color="#633BA0"
                    size="md"
                    loading={loading && loadingId == 2}
                    disabled={loading}
                    onClick={() => {
                      setErrorMessage('');
                      if (address && gasToken && recepient && sendAmount) {
                        handleSendToken(false);
                      } else {
                        setErrorMessage('Inputs not defined');
                      }
                    }}
                  >
                    Send Private
                  </Button>
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="shield">
                <Group gap={30}>
                  <Button
                    mt={30}
                    color="#3B77A0"
                    size="md"
                    loading={loading}
                    disabled={loading}
                    onClick={() => {
                      setErrorMessage('');
                      if (address && gasToken && sendAmount) {
                        // handleSendToken();
                      } else {
                        setErrorMessage('Inputs not defined');
                      }
                    }}
                  >
                    Unshield
                  </Button>
                  <Button
                    mt={30}
                    color="#633BA0"
                    size="md"
                    loading={loading}
                    disabled={loading}
                    onClick={() => {
                      setErrorMessage('');
                      if (address && gasToken && recepient && sendAmount) {
                        // handleSendToken();
                      } else {
                        setErrorMessage('Inputs not defined');
                      }
                    }}
                  >
                    Shield
                  </Button>
                </Group>
              </Tabs.Panel>

              <Stack gap={5} mt={10}>
                <Text style={{ textAlign: 'center', color: 'red' }}>
                  {errorMessage}
                </Text>

                {txHash && (
                  <Center>
                    <Text
                      style={{
                        fontSize: '14px',
                        color: props.isDarkTheme ? 'white' : 'black',
                      }}
                    >
                      Tx Hash:{' '}
                      <Anchor
                        ml={2}
                        style={{
                          fontSize: '14px',
                          color: props.isDarkTheme ? 'white' : 'black',
                        }}
                      >
                        {shortenTxHash(txHash)}
                      </Anchor>
                    </Text>
                  </Center>
                )}
              </Stack>
            </Stack>
          </Tabs>
        </Stack>
      </Box>
      <Center>
        <Group mt={30} gap={30}>
          <Text
            size="md"
            style={{
              color: faucetClicked ? 'white' : 'grey',
              textDecoration: 'underline',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onClick={() => handleFaucet(true)}
          >
            Faucet (public)
          </Text>
          <Text
            size="md"
            style={{
              color: faucetClicked ? 'white' : 'grey',
              textDecoration: 'underline',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onClick={() => handleFaucet(false)}
          >
            Faucet (private)
          </Text>
        </Group>
      </Center>
    </>
  );
}
