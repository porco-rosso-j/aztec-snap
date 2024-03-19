import { Group, Text, Anchor } from '@mantine/core';
import MetamaskLogo from '../assets/metamask_fox.svg';

type FooterProps = {
  isDarkTheme: boolean;
};
export function Footer(props: FooterProps) {
  const menuTextStyle = (_menuId: number) => {
    return {
      color: props.isDarkTheme ? 'white' : 'black',
      opacity: '50%',
      fontSize: '15px',
      cursor: 'pointer',
    };
  };

  return (
    <Group
      mt={60}
      pb={20}
      justify="center"
      style={{
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Anchor
        mr={20}
        href="https://github.com/porco-rosso-j/aztec-snap"
        target="_blank"
        rel="noreferrer"
      >
        <Text style={menuTextStyle}>github</Text>
      </Anchor>
      <Text mr={-6} style={menuTextStyle}>
        Powered by
      </Text>
      <img src={MetamaskLogo} style={{ width: 20, height: 20 }} />
    </Group>
  );
}
