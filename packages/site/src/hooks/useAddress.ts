import { useEffect, useState } from 'react';
import { AztecSnap } from '@abstract-crypto/aztec-snap-lib';
import { useMetaMaskContext } from '../contexts/MetamaskContext';
import { useAppContext } from '../contexts/useAppContext';
import { CompleteAddress } from '@aztec/aztec.js';
import { PXE_URL } from '../utils';
// import { CompleteAddress } from '@aztec/aztec.js';

export const useAddress = () => {
  const { installedSnap } = useMetaMaskContext();
  const { snapWallet, saveSnapWallet } = useAppContext();
  const [address, setAddress] = useState<string>('');
  console.log('address: ', address);
  console.log('snapWallet in use add: ', snapWallet);

  useEffect(() => {
    if (installedSnap && !address) {
      (async () => {
        if (!snapWallet) {
          await getSnapSelectedAddress();
        } else {
          await getAddress();
        }
      })();
    }
  }, [installedSnap, address, snapWallet]);

  // 1: get selected complete address
  // 2: instantiate SnapWallet
  const getSnapSelectedAddress = async () => {
    const aztecSnap = new AztecSnap(PXE_URL);
    const address = await aztecSnap.getSelectedAddress();
    console.log('selected addr: ', address);
    if (address) {
      const snapWallet = await aztecSnap.getSnapWallet(
        CompleteAddress.fromString(address),
      );
      saveSnapWallet(snapWallet);
    }
  };

  // 1: get aztec address in SnapWallet
  const getAddress = async () => {
    const addressResponse = snapWallet?.getAddress();
    console.log('addressResponse: ', addressResponse);
    if (addressResponse) {
      setAddress(addressResponse.toString());
    }
  };

  return { address, getAddress };
};
