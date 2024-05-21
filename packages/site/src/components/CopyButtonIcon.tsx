import { CopyButton, ActionIcon, Tooltip, rem } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';

type CopyButtonIconProps = {
  address: string;
};

export function CopyButtonIcon(props: CopyButtonIconProps) {
  return (
    <CopyButton value={props.address ? props.address : ''} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon
            color={copied ? 'teal' : 'gray'}
            variant="subtle"
            onClick={copy}
          >
            {copied ? (
              <IconCheck style={{ width: rem(16) }} />
            ) : (
              <IconCopy style={{ width: rem(16) }} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}
