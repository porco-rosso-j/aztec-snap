import { useEffect, useState } from 'react';
import { useCreateAccount } from '../hooks';
import { useMetaMask } from '../hooks/snap';
import CreateAccountModal from './Modals/CreateAccountModal';
import { delay } from '../utils/delay';

type OnboardProps = {
  address: string;
  getAddress: () => void;
};

export default function Onboard(props: OnboardProps) {
  const { installedSnap } = useMetaMask();
  const { createAccount } = useCreateAccount();
  const [hasAddress, setHasAddress] = useState<boolean>(false);

  useEffect(() => {
    if (!props.address && installedSnap) {
      const getSnapAddress = async () => {
        const address = await props.getAddress();
        console.log('address in getAddress: ', address);

        setHasAddress(!props.address);
      };

      getSnapAddress();
    }
  }, [props.address, installedSnap, props.getAddress]);

  const handleCreateAccount = async () => {
    await createAccount();
    await props.getAddress();
  };

  return (
    <>
      {hasAddress && (
        <CreateAccountModal
          address={props.address}
          setHasAddress={setHasAddress}
          handleCreateAccount={handleCreateAccount}
        />
      )}
    </>
  );
}
