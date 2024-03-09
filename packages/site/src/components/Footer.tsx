import { Group, Text, Anchor } from '@mantine/core';

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
      py={20}
      justify="center"
      style={{
        position: 'fixed', // Fix position to the bottom
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Anchor
        href="https://github.com/porco-rosso-j/aztec-snap/tree/dev"
        target="_blank"
        rel="noreferrer"
      >
        <Text style={menuTextStyle}>github</Text>
      </Anchor>
    </Group>
  );
}
