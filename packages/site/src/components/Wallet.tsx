import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextInput,
  Text,
  Group,
  Center,
  Stack,
  CopyButton,
  Anchor,
  Loader,
} from '@mantine/core';
import { useAppContext } from '../contexts/useAppContext';
import { shortenAddress, shortenTxHash } from '../utils/shortenAddr';
import { IconCopy, IconCopyCheck } from '@tabler/icons-react';
import useFaucet from '../hooks/useFaucet';
import useBalance from '../hooks/useBalance';
// import { provider, wallet } from '../utils/constants';

type WalletProps = {
  isDarkTheme: boolean;
};

export default function Wallet(props: WalletProps) {
  const { accountAddress, saveAccountAddress } = useAppContext();
  const { getFaucet } = useFaucet();
  const { getBalance } = useBalance();
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    saveAccountAddress(
      '0x2fd4503a9b855a852272945df53d7173297c1469cceda31048b85118364b09a3',
    );
  });

  //   const {
  //     anonAadhaarCore,
  //     userOpHash,
  //     txHash,
  //     sendStatus,
  //     sendStatusMsg,
  //     setSendStatus,
  //     setTxHash,
  //     setUserOpHash,
  //     generateNoirOTPProof,
  //     generateAnonAadahaarProof,
  //     sendTX,
  //   } = useSendETH();

  const [balance, setBalance] = useState<number>(0);
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [recepient, setRecepient] = useState<string>('');

  const [faucetClicked, setFacuetClicked] = useState(false);

  //   useEffect(() => {
  //     if (!qrData) {
  //       const data = localStorage.getItem('qr_data');
  //       saveQrData(data ? JSON.parse(data) : '');
  //     }
  //   }, [qrData]);

  //   const getETHBalance = async () => {
  //     let rawBalance = await provider.getBalance(accountAddress);
  //     let balance = Number(rawBalance) / 10 ** 18;
  //     setEtherBalance(balance);
  //   };

  // useEffect(() => {
  //   const timeOutId = setTimeout(async () => {
  //     if (accountAddress) {
  //       await getBalance(accountAddress);
  //     }
  //   });
  //   return () => clearTimeout(timeOutId);
  // }, [accountAddress]);

  async function handleFaucet() {
    setFacuetClicked(true);
    if (accountAddress) {
      const token = await getFaucet(accountAddress);
      const balance = await getBalance(token, accountAddress);
      setBalance(balance);
    } else {
      console.log('address not found');
    }
    setFacuetClicked(false);
  }

  //   async function genAadhaarProof() {
  //     setLoading(true);
  //     setSendStatus(0);
  //     setTxHash('');
  //     setUserOpHash('');

  //     try {
  //       setSendStatus(1);
  //       await generateAnonAadahaarProof(sendAmount, recepient);
  //     } catch (e) {
  //       console.log('e: ', e);
  //       setErrorMessage('Something went wrong');
  //       setLoading(false);
  //     }
  //   }

  //   console.log('sendStatus: ', sendStatus);
  //   console.log('isModalOpen: ', isModalOpen);

  //   useEffect(() => {
  //     if (anonAadhaarCore && sendStatus === 1 && !isModalOpen) {
  //       setModalOpen(true);
  //     }
  //   }, [anonAadhaarCore, sendStatus, isModalOpen]);

  //   async function sendETH(otp: string) {
  //     console.log('otp: ', otp);

  //     let genProofResult;
  //     try {
  //       setSendStatus(2);
  //       setModalOpen(false);
  //       genProofResult = await generateNoirOTPProof(otp);
  //     } catch (e) {
  //       console.log('e: ', e);
  //       setErrorMessage('Something went wrong');
  //       setLoading(false);
  //       return;
  //     }

  //     if (genProofResult) {
  //       try {
  //         const witnessArray: string[] = Array.from(
  //           genProofResult.proofData.publicInputs.values(),
  //         );
  //         await sendTX(
  //           genProofResult.proofData.proof,
  //           witnessArray[1],
  //           genProofResult.timestep,
  //           sendAmount,
  //           recepient,
  //         );

  //         await getETHBalance();
  //       } catch (e) {
  //         console.log('e: ', e);
  //         setErrorMessage('Something went wrong');
  //         setLoading(false);
  //       }
  //     } else {
  //       setErrorMessage('poof not found');
  //       setLoading(false);
  //     }

  //     setLoading(false);
  //   }

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
        <Stack align="center" gap="md">
          <Stack gap={1}>
            <Group>
              <Text style={textTextStyle} size="lg">
                {shortenAddress(accountAddress)}
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
              {balance.toFixed(2)} GAS
            </Text>
          </Stack>
          <Stack mt={20} align="center" style={{ boxShadow: '1rm' }}>
            {/* <Text style={textTextStyle} size="lg"></Text> */}
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
                if (recepient && sendAmount) {
                  // setModalOpen(true);
                  //genAadhaarProof();
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
              {/* {loading && sendStatus !== 0 ? (
                <Text mb={5} style={{ fontSize: '14px' }}>
                  {sendStatusMsg[sendStatus - 1]}
                </Text>
              ) : null}
              {sendStatus === 5 && userOpHash !== '' ? (
                <Center>
                  <Text style={{ fontSize: '14px' }}>
                    UserOperation Hash:{' '}
                    <Anchor
                      ml={2}
                      href={'https://app.jiffyscan.xyz/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '14px', textDecoration: 'underline' }}
                    >
                      {shortenTxHash(userOpHash)}
                    </Anchor>
                  </Text>
                </Center>
              ) : null}
              {sendStatus === 5 && txHash !== '' ? (
                <Center>
                  <Text style={{ fontSize: '14px' }}>
                    Transaction Hash:{' '}
                    <Anchor
                      ml={2}
                      href={'https://sepolia.scrollscan.com/tx/' + txHash}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '14px', textDecoration: 'underline' }}
                    >
                      {shortenTxHash(txHash)}
                    </Anchor>
                  </Text>
                </Center>
              ) : null} */}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Text
        mt={10}
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

      {/* {isModalOpen ? <OTPModal sendETH={sendETH} /> : null} */}
    </>
  );
}
