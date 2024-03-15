import { useEffect, useState } from 'react';
import { useCreateAccount } from '../hooks';
import CreateAccountModal from './Modals/CreateAccountModal';
import { useMetaMaskContext } from '../contexts/MetamaskContext';
import { useAppContext } from '../contexts/useAppContext';
import { AztecSnap } from '@abstract-crypto/aztec-snap-lib';
import { PXE_URL } from '../utils';
import { CompleteAddress } from '@aztec/aztec.js';

type OnboardProps = {
  address: string;
  getAddress: () => void;
};

export default function Onboard(props: OnboardProps) {
  const { installedSnap } = useMetaMaskContext();
  const { createAccount } = useCreateAccount();
  const [hasAddress, setHasAddress] = useState<boolean>(false);
  // const { gasToken, snapWallet, saveSnapWallet } = useAppContext();
  // useEffect(() => {
  //   if (!props.address && installedSnap) {
  //     const getSnapAddress = async () => {
  //       const address = props.getAddress();
  //       console.log('address in getAddress: ', address);

  //       setHasAddress(!props.address);
  //     };

  //     getSnapAddress();
  //   }
  // }, [props.address, installedSnap, props.getAddress]);

  // useEffect(() => {
  //   if (!props.address && installedSnap && !snapWallet) {
  //     const getSnapAddress = async () => {
  //       const aztecSnap = new AztecSnap(PXE_URL);
  //       const address = await aztecSnap.getSelectedAddress();
  //       console.log('selected addr: ', address);
  //       if (address) {
  //         const snapWallet = await aztecSnap.getSnapWallet(
  //           CompleteAddress.fromString(address),
  //         );
  //         saveSnapWallet(snapWallet);
  //       }
  //     };

  //     getSnapAddress();
  //   }
  // }, [address, installedSnap, snapWallet]);

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
