import { useEffect, useState } from 'react';
import { useCreateAccount } from '../hooks';
import CreateAccountModal from './Modals/CreateAccountModal';
import { useMetaMaskContext } from '../contexts/MetamaskContext';

type OnboardProps = {
  address: string;
  getAddress: () => void;
};

export default function Onboard(props: OnboardProps) {
  const { installedSnap } = useMetaMaskContext();
  const { createAccount } = useCreateAccount();
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
      {/* {hasAddress && (
        <CreateAccountModal
          address={props.address}
          setHasAddress={setHasAddress}
          handleCreateAccount={handleCreateAccount}
        />
      )} */}
    </>
  );
}
