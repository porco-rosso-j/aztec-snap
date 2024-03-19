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
import { IconCopy, IconCopyCheck } from '@tabler/icons-react';
import { useAppContext } from '../contexts/useAppContext';
import { shortenAddress, shortenTxHash } from '../utils';
import {
  useFaucet,
  useBalance,
  useAddress,
  useSendToken,
  useShieldToken,
  useRedeemToken,
  useGetPendingShields,
} from '../hooks';

type WalletProps = {
  isDarkTheme: boolean;
};

export default function Wallet(props: WalletProps) {
  const { gasToken } = useAppContext();
  const { address } = useAddress();
  const { getFaucet } = useFaucet();
  const { balance, privateBalance, setBalance, getBalance, setPrivateBalance } =
    useBalance();

  const { sendTxHash, sendLoadingId, sendToken } = useSendToken();
  const { shieldTxHash, shieldLoadingId, shieldToken } = useShieldToken();
  const { redeemTxHash, isRedeemLoading, redeemLoadingId, redeemToken } =
    useRedeemToken();
  const { pendingShields, fetchPendingShields } = useGetPendingShields();

  const [activeTab, setActiveTab] = useState('send');
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [recepient, setRecepient] = useState<string>('');
  const [faucetClicked, setFacuetClicked] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (sendTxHash && txHash !== sendTxHash) {
      setTxHash(sendTxHash);
    }

    if (shieldTxHash && txHash !== shieldTxHash) {
      setTxHash(shieldTxHash);
    }

    if (redeemTxHash && txHash !== redeemTxHash) {
      setTxHash(redeemTxHash);
    }
  }, [sendTxHash, shieldTxHash, redeemTxHash]);

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
      if (pub) {
        setBalance(balance[0]);
      } else {
        setPrivateBalance(balance[1]);
      }
    } else {
      console.log('address not set');
    }
    setLoading(false);
  }

  async function handleShieldToken(shield: boolean) {
    setLoading(true);
    if (address) {
      await shieldToken(gasToken, address, sendAmount, shield);
      const balance = await getBalance(gasToken, address);
      setBalance(balance[0]);
      setPrivateBalance(balance[1]);
      await fetchPendingShields();
    } else {
      console.log('address not set');
    }
    setLoading(false);
  }

  async function handleRedeemToken(amount: number, index: number) {
    setLoading(true);
    if (address) {
      await redeemToken(gasToken, address, amount, index);
      const balance = await getBalance(gasToken, address);
      setPrivateBalance(balance[1]);
      await fetchPendingShields();
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
          height: '610px',
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
          <Tabs mt={10} value={activeTab} style={{ minWidth: '350px' }}>
            <Tabs.List mb={30} style={{ justifyContent: 'center' }}>
              <Tabs.Tab
                value="send"
                style={{ width: '33%', backgroundColor: 'transparent' }}
                onClick={() => setActiveTab('send')}
              >
                <Text style={{ ...textTextStyle, fontSize: '20px' }}>Send</Text>
              </Tabs.Tab>
              <Tabs.Tab
                value="shield"
                style={{ width: '34%', backgroundColor: 'transparent' }}
                onClick={() => setActiveTab('shield')}
              >
                <Text style={{ ...textTextStyle, fontSize: '20px' }}>
                  Shield
                </Text>
              </Tabs.Tab>
              <Tabs.Tab
                value="redeem"
                style={{ width: '33%', backgroundColor: 'transparent' }}
                onClick={() => setActiveTab('redeem')}
              >
                <Text style={{ ...textTextStyle, fontSize: '20px' }}>
                  Redeem
                </Text>
              </Tabs.Tab>
            </Tabs.List>
            <Stack mt={20} align="center" style={{ boxShadow: '1rm' }}>
              {activeTab == 'send' && (
                <>
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
                    onChange={(event) =>
                      setRecepient(event.currentTarget.value)
                    }
                  />
                </>
              )}

              {activeTab == 'send' || activeTab == 'shield' ? (
                <>
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
                </>
              ) : null}

              {activeTab == 'redeem' && (
                <>
                  <Text style={textTextStyle} size="12px">
                    Claimable Pending Shields
                  </Text>
                  <Box
                    style={{
                      maxHeight: '150px',
                      overflowY: 'auto',
                    }}
                  >
                    {pendingShields
                      ? pendingShields.map((shield, index) => (
                          <Box
                            key={index}
                            my={10}
                            px={5}
                            py={7}
                            style={{
                              width: '300px',
                              boxShadow: 'black',
                              borderRadius: '5px',
                              borderColor: 'gray',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                            }}
                          >
                            <Group
                              px={15}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Text style={textTextStyle}>
                                ID: {shield.secretIndex}
                              </Text>
                              <Text style={textTextStyle}>
                                {shield.amount.toString()} GAS
                              </Text>
                              <Button
                                color="#633BA0"
                                size="xs"
                                loading={
                                  isRedeemLoading &&
                                  shield.secretIndex == redeemLoadingId
                                }
                                disabled={isRedeemLoading}
                                onClick={() => {
                                  setErrorMessage('');
                                  if (address && gasToken) {
                                    handleRedeemToken(
                                      shield.amount,
                                      shield.secretIndex,
                                    );
                                  } else {
                                    setErrorMessage('Something went wrong');
                                  }
                                }}
                              >
                                Redeem
                              </Button>
                            </Group>
                          </Box>
                        ))
                      : null}
                  </Box>
                </>
              )}

              <Tabs.Panel value="send">
                <Group gap={30}>
                  <Button
                    mt={30}
                    color="#3B77A0"
                    size="md"
                    loading={loading && sendLoadingId == 1}
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
                    loading={loading && sendLoadingId == 2}
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
                    loading={loading && shieldLoadingId == 2}
                    disabled={loading}
                    onClick={() => {
                      setErrorMessage('');
                      if (address && gasToken && sendAmount) {
                        handleShieldToken(false);
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
                    loading={loading && shieldLoadingId == 1}
                    disabled={loading}
                    onClick={() => {
                      setErrorMessage('');
                      if (address && gasToken && sendAmount) {
                        handleShieldToken(true);
                      } else {
                        setErrorMessage('Inputs not defined');
                      }
                    }}
                  >
                    Shield
                  </Button>
                </Group>
              </Tabs.Panel>
              <Tabs.Panel value="redeem">
                <Button
                  color="#633BA0"
                  size="md"
                  // loading={isRedeemLoading}
                  disabled={isRedeemLoading}
                  onClick={() => {
                    setErrorMessage('');
                    if (address && gasToken) {
                      // handleRedeemToken();
                      setErrorMessage('Batch redeem not supported yet');
                    } else {
                      setErrorMessage('Inputs not defined');
                    }
                  }}
                >
                  Redeem All
                </Button>
              </Tabs.Panel>

              <Stack gap={5} mt={5}>
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
