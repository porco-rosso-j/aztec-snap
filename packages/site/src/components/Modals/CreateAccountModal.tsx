import {
  Button,
  Center,
  Image,
  Modal,
  PinInput,
  Stack,
  Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';

type CreateAccountModalType = {
  address: string;
  setHasAddress: (bool: boolean) => void;
  handleCreateAccount: () => void;
};

const CreateAccountModal = (props: CreateAccountModalType) => {
  const [opened, setOpened] = useState(true);

  async function handleConfirm() {
    props.handleCreateAccount();
    setOpened(false);
  }

  useEffect(() => {
    if (opened && props.address) {
      setOpened(false);
      props.setHasAddress(false);
    }
  }, [opened, props.address]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        withCloseButton={false}
        centered
      >
        <Stack align="center" gap={40} my={40}>
          <Text size="lg" style={{ fontWeight: 'bold' }}>
            You don't have any account
          </Text>
          <Button variant="filled" onClick={handleConfirm}>
            Create Account
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default CreateAccountModal;
