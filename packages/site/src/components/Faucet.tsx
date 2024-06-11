import { useState } from 'react';
import { Text, Center, Stack } from '@mantine/core';
import { useETHFaucet } from '../hooks/useETHFaucet';

type FaucetProps = {
  address: string;
  tokens_len: number;
  getBalance: (token: string, address: string) => Promise<number[]>;
  updateTokenBalances: (token: string[]) => void;
  fetchTokens: () => void;
};

export function Faucet(props: FaucetProps) {
  const { getETHFaucet } = useETHFaucet();
  const [faucetClicked, setFacuetClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleFaucet() {
    setErrorMessage('');
    setFacuetClicked(true);
    if (props.address) {
      const token = await getETHFaucet();
      props.updateTokenBalances([token]);
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
            Get ETH Faucet
          </Text>
          {errorMessage && <Text c="red">{errorMessage}</Text>}
        </Stack>
      </Center>
    </>
  );
}
