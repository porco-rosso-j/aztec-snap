import { useEffect, useState } from 'react';
import { useAddress, useCreateAccount } from '../hooks';
import { useMetaMask } from '../hooks/snap';
import CreateAccountModal from './Modals/CreateAccountModal';

type OnboardProps = {
  address: string;
  getAddress: () => void;
};

export default function Onboard(props: OnboardProps) {
  const { installedSnap } = useMetaMask();
  const { createAccount } = useCreateAccount();
  // const { address, getAddress } = useAddress();
  const [hasAddress, setHasAddress] = useState<boolean>(false);

  useEffect(() => {
    if (!props.address && installedSnap) {
      const getSnapAddress = async () => {
        const address = props.getAddress();
        console.log('address in getAddress: ', address);

        setHasAddress(!props.address);
      };

      getSnapAddress();
    }
  }, [props.address, installedSnap, props.getAddress]);

  const handleCreateAccount = async () => {
    await createAccount();
    props.getAddress();
  };

  return (
    <>
      <>
        {hasAddress && (
          <CreateAccountModal handleCreateAccount={handleCreateAccount} />
        )}
      </>
    </>
  );
}
