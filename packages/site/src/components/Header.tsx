import { Group, Text, Button, Anchor } from '@mantine/core';
import { useAppContext } from '../contexts/useAppContext';
import { IconSun, IconMoonFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PXE_URL, defaultSnapOrigin, isLocalSnap } from '../utils';
import { useMetaMaskContext } from '../contexts/MetamaskContext';
import { AztecSnap } from '@abstract-crypto/aztec-snap-lib';

type HeaderProps = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};
export function Header(props: HeaderProps) {
  const { saveSnapWallet } = useAppContext();
  const { isFlask, snapsDetected, installedSnap, detect } =
    useMetaMaskContext();
  // const { requestSnap } = useRequestSnap(defaultSnapOrigin, '0.1.0');

  console.log('installedSnap: ', installedSnap);

  const navigate = useNavigate();
  const [memuId, setMenuId] = useState(0);

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  console.log('isMetaMaskReady: ', isMetaMaskReady);

  const menuTextStyle = (_menuId: number) => {
    return {
      color: props.isDarkTheme ? 'white' : 'black',
      opacity: memuId == _menuId ? '100%' : '50%',
      fontSize: '18px',
      cursor: 'pointer',
    };
  };

  const handleNavigate = (menu_id: number) => {
    setMenuId(menu_id);
    navigate(
      menu_id == 0
        ? '/'
        : menu_id == 1
        ? '/token'
        : menu_id == 2
        ? '/transaction'
        : '/',
    );
  };

  const handleRequest = async () => {
    const aztecSnap = new AztecSnap(PXE_URL);
    const snapWallet = await aztecSnap.connect();
    console.log('snapWallet.getAddress: ', snapWallet.getAddress());
    if (snapWallet) {
      detect();
      saveSnapWallet(snapWallet);
    }
  };

  const BottunStyle = {
    marginRight: '35px',
    color: props.isDarkTheme ? 'black' : 'white',
    backgroundColor: props.isDarkTheme ? '#D5C8F1' : '#35194D',
  };

  return (
    <Group py={20} justify="space-between">
      <Text
        size="25px"
        ml={35}
        c={props.isDarkTheme ? 'white' : 'black'}
        style={{ fontFamily: 'Verdana, sans-serif' }}
      >
        AztecSnap
      </Text>
      <Group gap={30} mt={5}>
        <Text style={menuTextStyle(0)} onClick={() => handleNavigate(0)}>
          Home
        </Text>
        <Text style={menuTextStyle(1)} onClick={() => handleNavigate(1)}>
          Tokens
        </Text>
        <Text style={menuTextStyle(2)} onClick={() => handleNavigate(2)}>
          Transactions
        </Text>
      </Group>

      <Group gap={30}>
        {props.isDarkTheme ? (
          <IconSun
            style={{ color: 'white' }}
            onClick={() => {
              props.toggleTheme();
            }}
          />
        ) : (
          <IconMoonFilled
            style={{ color: 'black' }}
            onClick={() => {
              props.toggleTheme();
            }}
          />
        )}
        {!isMetaMaskReady ? (
          <Button style={BottunStyle}>
            <Anchor
              style={{ color: props.isDarkTheme ? 'black' : 'white' }}
              href="https://metamask.io/flask/"
              target="_blank"
            >
              Install Flask
            </Anchor>
          </Button>
        ) : !installedSnap ? (
          <Button style={BottunStyle} onClick={() => handleRequest()}>
            Connect
          </Button>
        ) : (
          <Button
            style={BottunStyle}
            onClick={() => handleRequest()}
            disabled={!installedSnap}
          >
            Reconnect
          </Button>
          //   <Button
          //   style={BottunStyle}
          //   onClick={logout}
          //   disabled={!installedSnap}
          // >
          //   Disconnect
          // </Button>
        )}
      </Group>
    </Group>
  );
}
