import { Group, Text, Button, Anchor } from '@mantine/core';
import { IconSun, IconMoonFilled } from '@tabler/icons-react';
import { imgGithub, imgGithubWhite } from '../assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMetaMaskContext, useAppContext } from '../contexts';
import {
  AztecSnap,
  isLocalSnap,
  defaultSnapOrigin,
  PXE_URL,
} from '@abstract-crypto/aztec-snap-lib';

type HeaderProps = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};
export function Header(props: HeaderProps) {
  const location = useLocation();

  const { saveSnapWallet } = useAppContext();
  const { isFlask, snapsDetected, installedSnap, detect } =
    useMetaMaskContext();

  const navigate = useNavigate();
  const [menuId, setMenuId] = useState(0);

  useEffect(() => {
    if (menuId == 0) {
      let newMenuId = 0;
      if (location.pathname == '/bridge') {
        newMenuId = 1;
      } else if (location.pathname == '/swap') {
        newMenuId = 2;
      }
      setMenuId(newMenuId);
    }
  }, [location, menuId]);

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const menuTextStyle = (_menuId: number) => {
    return {
      color: props.isDarkTheme ? 'white' : 'black',
      opacity: menuId == _menuId ? '100%' : '50%',
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
        ? '/bridge'
        : menu_id == 2
        ? '/swap'
        : '/',
    );
  };

  const handleRequest = async () => {
    const aztecSnap = new AztecSnap(PXE_URL);
    const snapWallet = await aztecSnap.connect();
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
          Wallet
        </Text>
        <Text style={menuTextStyle(1)} onClick={() => handleNavigate(1)}>
          Bridge
        </Text>
        <Text style={menuTextStyle(2)} onClick={() => handleNavigate(2)}>
          Swap
        </Text>
      </Group>

      <Group gap={30}>
        <Anchor
          pt={7}
          mr={-3}
          href="https://github.com/porco-rosso-j/aztec-snap"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={props.isDarkTheme ? imgGithubWhite : imgGithub}
            alt="github"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </Anchor>
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
        )}
      </Group>
    </Group>
  );
}
