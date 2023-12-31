import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { connectSnap, getSnap } from '@abstract-crypto/aztec-snap-lib';
import {
  MetamaskActions,
  MetaMaskContext,
  useAddress,
  useBalance,
  useSendETH,
} from '../hooks';
import { Card } from '../components';
import {
  ConnectButton,
  InstallFlaskButton,
  CreateAccountButton,
  GetFaucetButton,
} from '../components/Buttons';

// small
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary.default};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error.muted};
  border: 1px solid ${({ theme }) => theme.colors.error.default};
  color: ${({ theme }) => theme.colors.error.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
  }
`;

const Index = () => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const isSnapInstalled = Boolean(state.installedSnap);
  const { address, createAccount } = useAddress(isSnapInstalled);
  const { balance, getFacuet } = useBalance(isSnapInstalled, address);

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleCreateAccountClick = async () => {
    if (isSnapInstalled) {
      try {
        await createAccount();
      } catch (e) {
        console.error(e);
      }
    } else {
      dispatch({
        type: MetamaskActions.SetError,
        payload: 'Connect to Metamask',
      });
    }
  };

  const handleFaucet = async () => {
    try {
      if (address) {
        await getFacuet(address);
      } else {
        console.log('no addr detected');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const {
    error: txError,
    recipientBalance,
    isLoading: isTxLoading,
    lastTxId,
    sendETH,
  } = useSendETH();

  const handleSendTx: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    if (address) {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      sendETH(formData, address);
    } else {
      console.log('no addr detected');
    }
  };

  return (
    <Container>
      <Heading>
        Welcome to <Span>Aztec Snap</Span>
      </Heading>
      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        {!state.isFlask && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {address ? (
          <Card
            fullWidth
            content={{
              title: 'Your Account Address',
              description: address,
            }}
          />
        ) : (
          <Card
            fullWidth
            content={{
              title: 'Create Account',
              description: 'Set up a new Aztec wallet using Metamask',
              button: (
                <CreateAccountButton
                  onClick={handleCreateAccountClick}
                  disabled={!state.isFlask}
                />
              ),
            }}
          />
        )}
        {balance !== undefined && (
          <Card
            fullWidth
            content={{
              title: 'Your ETH Balance',
              description: `${balance} ETH`,
              button: (
                <GetFaucetButton
                  onClick={handleFaucet}
                  disabled={!state.isFlask}
                />
              ),
            }}
          />
        )}
        {isSnapInstalled && (
          <Card
            fullWidth
            content={{
              title: 'Send ETH',
              description: (
                <>
                  <form onSubmit={handleSendTx}>
                    <p>
                      <input
                        type="string"
                        name="toAddress"
                        placeholder="0x000"
                      />
                    </p>
                    <p>
                      <input type="number" name="amount" placeholder="100" />
                    </p>
                    <button disabled={isTxLoading} type="submit">
                      Execute
                    </button>
                  </form>
                  {lastTxId && <p>Latest transaction: {`0x${lastTxId}`}</p>}
                  {txError && <ErrorMessage>{txError}</ErrorMessage>}
                  {recipientBalance && (
                    <p>Recipient's balanace: {recipientBalance} ETH</p>
                  )}
                </>
              ),
            }}
          />
        )}
      </CardContainer>
    </Container>
  );
};

export default Index;
