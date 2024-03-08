import { Group, Text, Button } from '@mantine/core';
import { useAppContext } from '../contexts/useAppContext';
import { IconSun, IconMoonFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type HeaderProps = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};
export function Header(props: HeaderProps) {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const [memuId, setMenuId] = useState(0);

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
        {/* 
        <Anchor
          href="https://github.com/porco-rosso-j/aztec-numer0n"
          target="_blank"
          rel="noreferrer"
          mt={5}
          //   mr={10}
        >
          <img src={imgGithub} alt="github" style={{ width: 25, height: 25 }} />
        </Anchor> */}
        <Button
          onClick={logout}
          mr={35}
          style={{
            color: props.isDarkTheme ? 'black' : 'white',
            backgroundColor: props.isDarkTheme ? '#D5C8F1' : '#35194D',
          }}
        >
          Disconnect
        </Button>
      </Group>
    </Group>
  );
}
