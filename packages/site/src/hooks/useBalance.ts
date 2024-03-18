import {
  AztecAddress,
  createPXEClient,
  SignerlessWallet,
} from '@aztec/aztec.js';
import { TokenContract } from '@aztec/noir-contracts.js';
import { PXE_URL } from '../utils';
import { useEffect, useState } from 'react';
import { useAddress } from '.';
import { useAppContext } from '../contexts/useAppContext';

export function useBalance() {
  const { gasToken, snapWallet } = useAppContext();
  const { address } = useAddress();
  const [balance, setBalance] = useState(0);
  const [privateBalance, setPrivateBalance] = useState(0);

  useEffect(() => {
    const checkBalances = async () => {
      if (address && gasToken) {
        const balance = await getBalance(gasToken, address);
        setBalance(balance[0]);
        setPrivateBalance(balance[1]);
      }
    };

    checkBalances();
  }, [address, gasToken]);

  async function getBalance(token: string, address: string): Promise<number[]> {
    const pxe = createPXEClient(PXE_URL);

    // https://github.com/porco-rosso-j/aztec_lend/blob/34e70cbc335222413c2edba1bae0a424a33288f1/src/scripts/cross-chain.ts#L436
    const l2tokenContract = await TokenContract.at(
      AztecAddress.fromString(token),
      new SignerlessWallet(pxe),
    );

    const balance = await l2tokenContract.methods
      .balance_of_public(AztecAddress.fromString(address))
      .view();

    if (!snapWallet) throw 'SnapWallet not found';

    // l2tokenContract can also access to anyone's private state atm
    // in the future, this shouldn't work
    // but only l2tokenContractPrivate w/ SnapWallet should work
    const l2tokenContractPrivate = await TokenContract.at(
      AztecAddress.fromString(token),
      snapWallet,
    );

    const aztAddr = AztecAddress.fromString(address);
    const privateBalance = await l2tokenContractPrivate.methods
      .balance_of_private(aztAddr)
      .view({ from: aztAddr });

    console.log('privateBalance: ', privateBalance);
    return [Number(balance), Number(privateBalance)];
  }

  return {
    balance,
    privateBalance,
    setBalance,
    setPrivateBalance,
    getBalance,
  };
}
