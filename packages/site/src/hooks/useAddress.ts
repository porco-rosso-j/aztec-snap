import { useEffect, useState } from 'react';
import { CompleteAddress } from '@aztec/aztec.js';
import { AztecSnap, PXE_URL } from '@abstract-crypto/aztec-snap-lib';
import { useAppContext, useMetaMaskContext } from '../contexts';

export const useAddress = () => {
  const { installedSnap } = useMetaMaskContext();
  const { snapWallet, saveSnapWallet } = useAppContext();
  const [address, setAddress] = useState<string>('');

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

  // TODO: at least have this address this context
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
    if (!snapWallet) return;
    const addressResponse = snapWallet.getAddress();
    console.log('addressResponse: ', addressResponse);
    if (addressResponse) {
      setAddress(addressResponse.toString());
    }
  };

  return { address, getAddress };
};
