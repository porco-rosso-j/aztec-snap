import { useEffect, useState } from 'react';
import { useAddress, useCreateAccount } from '../hooks';
import { useMetaMask } from '../hooks/snap';
import CreateAccountModal from './Modals/CreateAccountModal';

type OnboardProps = {};

export default function Onboard(props: OnboardProps) {
  const { installedSnap } = useMetaMask();
  const { createAccount } = useCreateAccount();
  const { address, getAddress } = useAddress();
  const [hasAddress, setHasAddress] = useState<boolean>(false);

  useEffect(() => {
    if (!address && installedSnap) {
      const getSnapAddress = async () => {
        const address = await getAddress();
        console.log('address in getAddress: ', address);

        setHasAddress(!address);
      };

      getSnapAddress();
    }
  }, [address, installedSnap, getAddress]);

  return (
    <>
      <>
        {hasAddress && (
          <CreateAccountModal handleCreateAccount={createAccount} />
        )}
      </>
    </>
  );
}
