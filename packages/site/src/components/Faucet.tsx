import { useState } from 'react';
import { Text, Center, Stack } from '@mantine/core';
import { useFaucet } from '../hooks';

type FaucetProps = {
  address: string;
  tokens_len: number;
  getBalance: (token: string, address: string) => Promise<number[]>;
  updateTokenBalance: (token: string) => void;
  fetchTokens: () => void;
};

export function Faucet(props: FaucetProps) {
  const { getFaucet } = useFaucet();
  const [faucetClicked, setFacuetClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleFaucet() {
    setErrorMessage('');
    setFacuetClicked(true);
    if (props.address) {
      console.log('props.tokens_len + 1: ', props.tokens_len + 1);
      const token = await getFaucet(props.address, props.tokens_len + 1);
      props.fetchTokens(); // update token list
      props.updateTokenBalance(token);
    } else {
      setErrorMessage('address not found');
    }
    setFacuetClicked(false);
  }

  return (
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
            onClick={() => handleFaucet()}
          >
            Token Faucet
          </Text>
          {errorMessage && <Text c="red">{errorMessage}</Text>}
        </Stack>
      </Center>
    </>
  );
}
