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
} from '@mantine/core';
import { shortenAddress, shortenTxHash } from '../utils/shortenAddr';
import { IconCopy, IconCopyCheck } from '@tabler/icons-react';
import useFaucet from '../hooks/useFaucet';
import useBalance from '../hooks/useBalance';
import Onboard from './Onboad';
import { useAddress, useSendToken } from '../hooks';
import { useAppContext } from '../contexts/useAppContext';

type WalletProps = {
  isDarkTheme: boolean;
};

export default function Wallet(props: WalletProps) {
  const { gasToken } = useAppContext();
  const { address } = useAddress();
  const { getFaucet } = useFaucet();
  const { balance, setBalance, getBalance } = useBalance();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  console.log('gasToken: ', gasToken);

  const { txHash, sendToken } = useSendToken();

  const [sendAmount, setSendAmount] = useState<number>(0);
  const [recepient, setRecepient] = useState<string>('');
  const [faucetClicked, setFacuetClicked] = useState(false);

  async function handleFaucet() {
    setFacuetClicked(true);
    if (address) {
      const token = await getFaucet(address);
      const balance = await getBalance(token, address);
      setBalance(balance);
    } else {
      console.log('address not found');
    }
    setFacuetClicked(false);
  }

  async function handleSendToken() {
    setLoading(true);
    if (address) {
      await sendToken(gasToken, address, recepient, sendAmount);
      const balance = await getBalance(gasToken, address);
      setBalance(balance);
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
        <Onboard />
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
          <Stack align="center" mt={30} gap={3}>
            <Text style={textTextStyle} size="xl">
              Current Public Balance
            </Text>
            <Text style={{ ...textTextStyle, fontSize: '40px' }} size="xl">
              {balance.toFixed(0)} GAS
            </Text>
          </Stack>
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

            <Button
              mt={30}
              color="blue"
              size="md"
              loading={loading}
              disabled={loading}
              onClick={() => {
                setErrorMessage('');
                if (address && gasToken && recepient && sendAmount) {
                  handleSendToken();
                } else {
                  setErrorMessage('Inputs not defined');
                }
              }}
            >
              Send
            </Button>
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
                      // target="_blank"
                      // rel="noopener noreferrer"
                      // this link will be redirected to transaciton page
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
        </Stack>
      </Box>
      <Text
        mt={50}
        size="md"
        style={{
          color: faucetClicked ? 'white' : 'grey',
          textDecoration: 'underline',
          cursor: 'pointer',
          textAlign: 'center',
        }}
        onClick={handleFaucet}
      >
        Get Faucet
      </Text>
    </>
  );
}
