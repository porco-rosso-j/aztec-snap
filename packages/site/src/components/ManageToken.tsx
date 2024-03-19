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
import { TokenWithBalance, shortenTxHash } from '../utils';
import {
  useSendToken,
  useShieldToken,
  useRedeemToken,
  useGetPendingShields,
} from '../hooks';

type ManageTokenProps = {
  isDarkTheme: boolean;
  token: TokenWithBalance;
  address: string;
  updateTokenBalance: (token: string) => void;
  handleOpenManageToken: (open: boolean, id: number) => void;
};

export function ManageToken(props: ManageTokenProps) {
  const token = props.token.address;
  const { sendTxHash, sendLoadingId, sendToken } = useSendToken();
  const { shieldTxHash, shieldLoadingId, shieldToken } = useShieldToken();
  const { redeemTxHash, isRedeemLoading, redeemLoadingId, redeemToken } =
    useRedeemToken();
  const { pendingShields, fetchPendingShields } = useGetPendingShields(token);

  const [activeTab, setActiveTab] = useState('send');
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [recepient, setRecepient] = useState<string>('');
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

  async function handleSendToken(pub: boolean) {
    setLoading(true);
    if (props.address) {
      await sendToken(token, props.address, recepient, sendAmount, pub);
      props.updateTokenBalance(token);
    } else {
      console.log('address not set');
    }
    setLoading(false);
  }

  async function handleShieldToken(shield: boolean) {
    setLoading(true);
    if (props.address) {
      await shieldToken(token, props.address, sendAmount, shield);
      props.updateTokenBalance(token);
      await fetchPendingShields();
    } else {
      console.log('props.address not set');
    }
    setLoading(false);
  }

  async function handleRedeemToken(amount: number, index: number) {
    setLoading(true);
    if (props.address) {
      await redeemToken(token, props.address, amount, index);
      props.updateTokenBalance(token);
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

  return (
    <Stack align="center" gap="md">
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
            <Text style={{ ...textTextStyle, fontSize: '20px' }}>Shield</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value="redeem"
            style={{ width: '33%', backgroundColor: 'transparent' }}
            onClick={() => setActiveTab('redeem')}
          >
            <Text style={{ ...textTextStyle, fontSize: '20px' }}>Redeem</Text>
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
                onChange={(event) => setRecepient(event.currentTarget.value)}
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
                            {shield.amount.toString()} {props.token.symbol}
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
                              if (props.address && props.token) {
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
                  if (props.address && props.token && sendAmount) {
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
                  if (props.address && props.token && recepient && sendAmount) {
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
                  if (props.address && props.token && sendAmount) {
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
                  if (props.address && props.token && sendAmount) {
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
            {pendingShields && pendingShields.length != 0 ? (
              <>
                <Button
                  color="#633BA0"
                  size="md"
                  disabled={isRedeemLoading}
                  onClick={() => {
                    setErrorMessage('');
                    if (props.address && props.token) {
                      // handleRedeemToken();
                      setErrorMessage('Batch redeem not supported yet');
                    } else {
                      setErrorMessage('Inputs not defined');
                    }
                  }}
                >
                  Redeem All
                </Button>
              </>
            ) : (
              <>
                <Text mt={10} style={textTextStyle}>
                  No Pending Shields Found...
                </Text>
              </>
            )}
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
            <Text
              size="md"
              mt={10}
              style={{
                color: props.isDarkTheme ? 'white' : 'grey',
                textDecoration: 'underline',
                cursor: 'pointer',
                textAlign: 'center',
                opacity: '80%',
              }}
              onClick={() => props.handleOpenManageToken(false, 0)}
            >
              Back
            </Text>
          </Stack>
        </Stack>
      </Tabs>
    </Stack>
  );
}
